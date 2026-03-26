import { useEffect, useState } from "react";

function App() {
  const [report, setReport] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/report")
      .then(res => res.json())
      .then(data => setReport(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Weekly Productivity Report</h1>

      <h2>✅ Productive Time: {format(report.productive)}</h2>
      <h2>❌ Unproductive Time: {format(report.unproductive)}</h2>
    </div>
  );
}

function format(ms) {
  if (!ms) return "0 min";
  const min = Math.floor(ms / 60000);
  return `${min} min`;
}

export default App;