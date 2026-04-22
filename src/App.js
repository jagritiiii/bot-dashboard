import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [blockBots, setBlockBots] = useState(true);
  const [blockSuspicious, setBlockSuspicious] = useState(true);

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
        ip,
        country,
        type
      });
    }

    setData(temp);
  };

  const filtered = data.filter(d => {
    if (blockBots && d.type === "Bot") return false;
    if (blockSuspicious && d.type === "Suspicious") return false;
    return true;
  });

  return (
    <div style={{ fontFamily: "Arial" }}>

      {/* Landing Page */}
      <div style={{ padding: "20px", background: "#282c34", color: "white" }}>
        <h1>Traffic Monitoring Dashboard</h1>
        <p>Simulate and filter website visitors using bot detection logic.</p>
      </div>

      {/* Campaign Setup */}
      <div style={{ padding: "20px" }}>
        <h2>📢 Create Campaign</h2>

        <input placeholder="Enter Website URL" style={{ padding: "8px", width: "300px" }} />
        
        <p style={{ marginTop: "10px" }}>Integration Code:</p>
        <code>
          {`<script>trackVisitor()</script>`}
        </code>
      </div>

      {/* Conditions */}
      <div style={{ padding: "20px" }}>
        <h2>⚙️ Set Conditions</h2>

        <label>
          <input 
            type="checkbox" 
            checked={blockBots}
            onChange={() => setBlockBots(!blockBots)}
          />
          Block Bots
        </label>

        <br />

        <label>
          <input 
            type="checkbox" 
            checked={blockSuspicious}
            onChange={() => setBlockSuspicious(!blockSuspicious)}
          />
          Block Suspicious Traffic
        </label>
      </div>

      {/* Traffic Simulation */}
      <div style={{ padding: "20px" }}>
        <h2>🚦 Simulate Traffic</h2>

        <button onClick={generateTraffic}>
          Generate Visitors
        </button>

        <h3>Total Visitors: {data.length}</h3>
        <h3>Visible After Filter: {filtered.length}</h3>

        <h2>All Traffic</h2>
        <ul>
          {data.map((d, i) => (
            <li key={i}>
              {d.userAgent} | {d.ip} | {d.country} → {d.type}
            </li>
          ))}
        </ul>

        <h2>Filtered Traffic</h2>
        <ul>
          {filtered.map((d, i) => (
            <li key={i}>
              {d.userAgent} | {d.ip} | {d.country}
            </li>
          ))}
        </ul>

        {(data.length !== filtered.length) && (
          <p style={{ color: "red" }}>
            Some users were blocked / redirected based on conditions
          </p>
        )}
      </div>

    </div>
  );
}

export default App;