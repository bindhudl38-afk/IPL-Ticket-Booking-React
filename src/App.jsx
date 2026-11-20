
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {

  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "CSK",
      date: "10 April 2027",
      venue: "Bengaluru"
    },
    {
      id: 2,
      team1: "MI",
      team2: "KKR",
      date: "12 April 2027",
      venue: "Mumbai"
    },
    {
      id: 3,
      team1: "SRH",
      team2: "DC",
      date: "15 April 2027",
      venue: "Hyderabad"
    }
  ];

  return (
    <div>
      <Navbar />

      <Hero />

   <h2 id="matches">Upcoming Matches</h2>

      <div className="matches">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            venue={match.venue}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
