const router = require("express").Router();

router
  .route("/")
  .get((_req, res) => {
    res.status(200).json("Testing warehouse route");
  })
  .post((_req, res) => {
    res.status(201).json("");
  });

module.exports = router;
