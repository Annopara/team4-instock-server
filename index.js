const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 8000;

const inventoryRoute = require("./routes/inventory");
const warehouseRoute = require("./routes/warehouse");

app.use("/inventory", inventoryRoute);
app.use("/warehouse", warehouseRoute);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
