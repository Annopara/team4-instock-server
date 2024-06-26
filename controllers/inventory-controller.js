const knex = require("knex")(require("../knexfile"));

const findOne = async (req, res) => {
  try {
    const usersFound = await knex("inventories").where({ id: req.params.id });

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

const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving data: ${err}`);
  }
};

const posts = async (req, res) => {
  try {
    const posts = await knex("inventories")
      .join("post", "post.user_id", "user.id")
      .where({ user_id: req.params.id });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve posts for user with ID ${req.params.id}: ${error}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

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
    if (!validator.isNumeric(quantity)) {
      return res.status(400).json({ error: "Quantity must be a number." });
    }
    const newInventory = await knex("inventories").insert(req.body);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to add inventory item for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const updatedUser = await knex("inventories").where({
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
    const deleteInventory = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (deleteInventory === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }

    
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Inventory: ${error}`,
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
