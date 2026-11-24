
import { useState } from "react";

function MatchCard({ match, onBook }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);

  function handleBooking(e) {
    e.preventDefault();

    onBook(match, name, email, Number(seats));

    setName("");
    setEmail("");
    setSeats(1);
  }

  return (
    <div>
      <h3>{match.team1} vs {match.team2}</h3>

      <p>Date: {match.match_date}</p>
      <p>Venue: {match.venue}</p>

      <p>Available Seats: {match.available_seats}</p>

      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          max={match.available_seats}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          required
        />

        <button type="submit" disabled={match.available_seats === 0}>
          Book Ticket
        </button>
      </form>
    </div>
  );
}

export default MatchCard;
