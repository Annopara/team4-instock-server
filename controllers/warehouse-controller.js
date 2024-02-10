const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving data: ${err}`);
  }
};

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

const posts = async (req, res) => {
  try {
    const posts = await knex("warehouses")
      .join("inventories", "inventories.user_id", "warehouses.id")
      .where({ user_id: req.params.id });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve posts for user with ID ${req.params.id}: ${error}`,
    });
  }
};

// ADDS NEW FORM TO WAREHOUSE DATA
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
      message: `Unable to create new user: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
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

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
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
