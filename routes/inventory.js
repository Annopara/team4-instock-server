const router = require("express").Router();

const inventoryController = require("../controllers/inventory-controller");

router.route("/").get(inventoryController.index).post(inventoryController.add);

router
  .route("/:id")
  .get(inventoryController.findOne)
  .patch(inventoryController.update)
  .delete(inventoryController.remove);

// router.route("/:id/posts").get(inventoryController.posts);
// // not sure if this is needed - no posts for inventory

module.exports = router;
