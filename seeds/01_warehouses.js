const warehousesData = require("../seed-data/warehouses-data");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("warehouses").del();
  await knex("warehouses").insert(warehousesData);
};
