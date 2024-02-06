const inventoriesData = require("../seed-data/inventories-data");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("inventories").del();
  await knex("inventories").insert(inventoriesData);
};
