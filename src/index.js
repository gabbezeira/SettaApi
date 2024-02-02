const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

// Model
const SensorTemp = mongoose.model("Sensor", {
  temperature: Number,
  elevatedTemp: Boolean,
});

// GET
app.get("/", async (req, res) => {
  const sensors = await SensorTemp.find();
  return res.send(sensors);
});

// POST
app.post("/", async (req, res) => {
  const sensor = new SensorTemp({
    temperature: req.body.temperature,
    elevatedTemp: req.body.elevatedTemp,
  });

  await sensor.save();
  return res.send(sensor);
});

// DELETE
app.delete("/:id", async (req, res) => {
  const sensor = await SensorTemp.findByIdAndRemove(req.params.id);
  return res.send(sensor);
});

// UPDATE
app.put("/:id", async (req, res) => {
  const sensor = await SensorTemp.findByIdAndUpdate(
    req.params.id,
    {
      temperature: req.body.temperature,
      elevatedTemp: req.body.elevatedTemp,
    },
    {
      new: true,
    }
  );
  return res.send(sensor);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://gabrielalvescode:ylSC8AySZxX2KexK@settachallenge.oxapjb0.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log(`Example app listening on port ${port}`);
});
