const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT } = process.env || 8000;

app.use(cors());
app.use(express.json());

const inventoryRoute = require("./routes/inventory");
const warehouseRoute = require("./routes/warehouse");

app.use("/api/inventories", inventoryRoute);
app.use("/api/warehouses", warehouseRoute);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
