const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");
const knex = require('knex')(/* your db config */);

// Existing routes
router.route("/").get(warehouseController.index).post(warehouseController.add);
router.route("/:id").get(warehouseController.findOne).put(warehouseController.update).delete(warehouseController.remove);

// New route for getting inventories of a specific warehouse
router.get('/:id/inventories', async (req, res) => {
    try {
        const { id } = req.params;
        const inventories = await knex('inventories').where({ warehouseId: id });

        if (inventories.length === 0) {
            return res.status(404).json({ error: 'Warehouse ID not found' });
        }

        return res.status(200).json(inventories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

module.exports = router;

