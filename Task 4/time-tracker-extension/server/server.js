const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productivity");

const Track = mongoose.model("Track", {
  website: String,
  timeSpent: Number,
  date: { type: Date, default: Date.now }
});

// Classification logic
const productiveSites = ["github.com", "leetcode.com", "stackoverflow.com"];

app.post("/track", async (req, res) => {
  const { website, timeSpent } = req.body;

  const category = productiveSites.includes(website)
    ? "productive"
    : "unproductive";

  await Track.create({ website, timeSpent, category });

  res.send("Saved");
});

// Weekly report
app.get("/report", async (req, res) => {
  const data = await Track.find();

  let productive = 0;
  let unproductive = 0;

  data.forEach(d => {
    if (d.category === "productive") productive += d.timeSpent;
    else unproductive += d.timeSpent;
  });

  res.json({ productive, unproductive });
});

app.listen(5000, () => console.log("Server running on 5000"));