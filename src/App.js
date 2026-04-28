import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
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

      {/* Landing */}
      <div style={{ padding: "20px", background: "#282c34", color: "white" }}>
        <h1>Cloaking Dashboard</h1>
        <p>Simulate campaign → detection → filtering → routing</p>
      </div>

      {/* Campaign */}
      <div style={{ padding: "20px" }}>
        <h2>📢 Create Campaign</h2>

        <input 
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />

        <p style={{ marginTop: "10px" }}>
          Tracking: <strong>{url || "No URL entered"}</strong>
        </p>

        <p>Integration Code:</p>
        <code>{`<script>trackVisitor()</script>`}</code>
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

      {/* Traffic */}
      <div style={{ padding: "20px" }}>
        <h2>🚦 Simulate Traffic</h2>

        <button onClick={generateTraffic} style={{ padding: "10px" }}>
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

        {/* CLOAKING SIMULATION */}
        <h2>🔁 Simulated Visitor Experience</h2>

        {data.length > 0 && (
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid gray" }}>

            {data[0].type === "Human" && (
              <div>
                <h3>💰 Money Page</h3>
                <p>This is the real content shown to normal users.</p>
              </div>
            )}

            {data[0].type === "Bot" && (
              <div>
                <h3>🛡️ Safe Page</h3>
                <p>Bot detected — redirected to safe content.</p>
              </div>
            )}

            {data[0].type === "Suspicious" && (
              <div>
                <h3>⛔ Blocked</h3>
                <p>Access denied due to suspicious activity.</p>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}

export default App;