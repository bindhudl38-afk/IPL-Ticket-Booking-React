
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*");

    if (error) {
      console.log("Fetch Error:", error.message);
      setLoading(false);
    } else {
      console.log("Matches:", data);
      setMatches(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches"
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function bookTicket(match, name, email, seats) {
    if (!name || !email || seats < 1) {
      alert("Please enter valid details");
      return;
    }

    if (seats > match.available_seats) {
      alert("Not enough seats available!");
      return;
    }

    const { data: updatedMatch, error: updateError } = await supabase
      .from("matches")
      .update({
        available_seats: match.available_seats - seats
      })
      .eq("id", match.id)
      .gte("available_seats", seats)
      .select()
      .single();

    if (updateError) {
      alert("Booking failed: " + updateError.message);
      fetchMatches();
      return;
    }

    const { error: bookingError } = await supabase
      .from("bookings")
      .insert({
        customer_name: name,
        email: email,
        match_id: match.id,
        seats: seats
      });

    if (bookingError) {
      await supabase
        .from("matches")
        .update({
          available_seats: updatedMatch.available_seats + seats
        })
        .eq("id", match.id);

      alert("Booking failed: " + bookingError.message);
      fetchMatches();
      return;
    }

    alert("Ticket booked successfully!");
    fetchMatches();
  }

  return (
    <div>
      <Navbar />
      <Hero />

      <h2 id="matches">Upcoming Matches</h2>

      <div className="matches">
        {loading ? (
          <p>Loading matches...</p>
        ) : matches.length === 0 ? (
          <p>No matches found. Check your Supabase database.</p>
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onBook={bookTicket}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
