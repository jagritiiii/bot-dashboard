import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const generateTraffic = () => {
    const agents = ["Chrome", "Firefox", "Googlebot", "HeadlessChrome"];
    let temp = [];

    for (let i = 0; i < 10; i++) {
      let ua = agents[Math.floor(Math.random() * agents.length)];
      let type = "Human";

      if (ua.toLowerCase().includes("bot")) type = "Bot";
      else if (ua.includes("Headless")) type = "Suspicious";

      temp.push({ userAgent: ua, type });
    }

    setData(temp);
  };

  const humans = data.filter(d => d.type === "Human");
  const bots = data.filter(d => d.type === "Bot");
  const suspicious = data.filter(d => d.type === "Suspicious");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚦 Bot Detection Dashboard</h1>

      <button onClick={generateTraffic}>
        Simulate Traffic
      </button>

      <h3>Total: {data.length}</h3>
      <h3>Humans: {humans.length}</h3>
      <h3>Bots: {bots.length}</h3>
      <h3>Suspicious: {suspicious.length}</h3>

      <h2>All Traffic</h2>
      <ul>
        {data.map((d, i) => (
          <li key={i}>
            {d.userAgent} → {d.type}
          </li>
        ))}
      </ul>

      <h2>Filtered (Humans Only)</h2>
      <ul>
        {humans.map((d, i) => (
          <li key={i}>
            {d.userAgent}
          </li>
        ))}
      </ul>

      {bots.length > 0 && (
        <p style={{ color: "red" }}>
          Bots detected → would be redirected/blocked
        </p>
      )}
    </div>
  );
}

export default App;