const router = require("express").Router();

const warehouseController = require("../controllers/warehouse-controller");

// updated route to include /api/warehouses
router
  .route("/api/warehouses")
  .get(warehouseController.index)
  .post(warehouseController.add);

// updated route to include /api/warehouses
router
  .route("api/warehouses/:id")
  .get(warehouseController.findOne)
  .put(warehouseController.update)
  .delete(warehouseController.remove);

// router
//   .route("/:id/posts")
//   .get(warehouseController.posts);
// not sure if this is necessary - we don't have posts for warehouses


module.exports = router;
