const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// app.route("/").get((_req, res) => {
//   res.json("Testing Server");
// }); // you can run it to test the server...

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
