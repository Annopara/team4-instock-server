const knex = require("knex")(require("../knexfile"));

// CONTROLLER FOR GETTING ALL WAREHOUSE DATA

const index = async (_req, res) => {
  try {
    const warehouses = await knex("warehouses");
    warehouses
      ? res.status(200).json(warehouses)
      : res.status(404).json({ message: "No warehouses found" });
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`);
  }
};

// CONTROLLER FOR GETTING A SINGLE WAREHOUSE

const findOne = async (req, res) => {
  try {
    const usersFound = await knex("warehouses").where({ id: req.params.id });

    if (usersFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const userData = usersFound[0];
    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`,
    });
  }
};

// CONTROLLER FOR POST/CREATE NEW INVENTORY ITEM ATTACHED TO PARTICULAR WAREHOUSE

const posts = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    // API VALIDATION OF REQUIRED FIELDS

    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      !quantity
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // API VALIDATION OF QUANTITY FIELD

    if (!validator.isNumeric(quantity)) {
      return res
        .status(400)
        .json({ error: "Quantity must be a valid number." });
    }

    // STORE ID OF WAREHOUSE INVENTORY IS ATTACHED TO
    const warehouseId = req.params.id;

    //
    const inventoryData = await knex("inventory").insert(inventory).where({
      warehouse_id: warehouseId,
    });

    res.status(201).json(inventoryData);
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve inventory data for warehouse with ID ${req.params.id}`,
    });
  }
};

// ADDS NEW WAREHOUSE

const add = async (req, res) => {
  const newWarehouseInfo = req.body;

  // API validation of required fields
  if (
    !newWarehouseInfo.warehouse_name ||
    !newWarehouseInfo.address ||
    !newWarehouseInfo.city ||
    !newWarehouseInfo.country ||
    !newWarehouseInfo.contact_name ||
    !newWarehouseInfo.contact_position ||
    !newWarehouseInfo.contact_phone ||
    !newWarehouseInfo.contact_email
  ) {
    return res.status(400).json({
      message: "Required fields are missing in the request",
    });
  }

  try {
    const result = await knex("warehouses").insert(newWarehouseInfo);

    const newUserId = result[0];
    const createdUser = await knex("warehouses").where({ id: newUserId });

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouse: ${error}`,
    });
  }
};

const update = async (req, res) => {
  const newWarehouseInfo = req.body;
  // API validation of required fields
  if (
    !newWarehouseInfo.warehouse_name ||
    !newWarehouseInfo.address ||
    !newWarehouseInfo.city ||
    !newWarehouseInfo.country ||
    !newWarehouseInfo.contact_name ||
    !newWarehouseInfo.contact_position ||
    !newWarehouseInfo.contact_phone ||
    !newWarehouseInfo.contact_email
  ) {
    return res.status(400).json({
      message: "Required fields are missing in the request",
    });
  }
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const updatedUser = await knex("warehouses").where({
      id: req.params.id,
    });

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update user with ID ${req.params.id}: ${error}`,
    });
  }
};

// CONTROLLER FOR DELETING WAREHOUSE DATA

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};

module.exports = {
  index,
  findOne,
  posts,
  add,
  update,
  remove,
};
