import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const generateTraffic = () => {
    const agents = ["Chrome", "Firefox", "Googlebot", "HeadlessChrome"];
    const countries = ["India", "USA", "Germany", "Singapore"];
    const ips = ["192.168.1.1", "10.0.0.2", "172.16.0.5", "8.8.8.8"];

    let temp = [];

    for (let i = 0; i < 10; i++) {
      let ua = agents[Math.floor(Math.random() * agents.length)];
      let country = countries[Math.floor(Math.random() * countries.length)];
      let ip = ips[Math.floor(Math.random() * ips.length)];

      let type = "Human";

      if (ua.toLowerCase().includes("bot")) type = "Bot";
      else if (ua.includes("Headless")) type = "Suspicious";

      temp.push({
        userAgent: ua,
        ip: ip,
        country: country,
        type: type
      });
    }

    setData(temp);
  };

  const humans = data.filter(d => d.type === "Human");
  const bots = data.filter(d => d.type === "Bot");
  const suspicious = data.filter(d => d.type === "Suspicious");

  return (
    <div style={{ fontFamily: "Arial" }}>

      {/* Landing Page */}
      <div style={{ padding: "20px", background: "#282c34", color: "white" }}>
        <h1>Welcome to My Website</h1>
        <p>This is a sample landing page with integrated bot detection system.</p>
      </div>

      {/* Bot Detection Dashboard */}
      <div style={{ padding: "20px" }}>
        <h2>🚦 Traffic Monitoring System</h2>

        <button 
          onClick={generateTraffic} 
          style={{ padding: "10px", marginBottom: "10px" }}
        >
          Simulate Traffic
        </button>

        <h3>Total Visitors: {data.length}</h3>
        <h3>Humans: {humans.length}</h3>
        <h3>Bots: {bots.length}</h3>
        <h3>Suspicious: {suspicious.length}</h3>

        <h2>All Traffic</h2>
        <ul>
          {data.map((d, i) => (
            <li key={i}>
              {d.userAgent} | {d.ip} | {d.country} → {d.type}
            </li>
          ))}
        </ul>

        <h2>Filtered Users (Humans Only)</h2>
        <ul>
          {humans.map((d, i) => (
            <li key={i}>
              {d.userAgent} | {d.ip} | {d.country}
            </li>
          ))}
        </ul>

        {bots.length > 0 && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Bots detected → filtered / would be redirected
          </p>
        )}
      </div>

    </div>
  );
}

export default App;