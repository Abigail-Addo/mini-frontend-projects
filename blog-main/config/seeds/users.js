/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return (
    knex("users")
      // Deletes ALL existing entries
      .del()
      .then(function () {
        return knex("users").insert([
          {
            username: "admin",
            password: "admin1234"
          }
        ]); 
      })
      .catch(function (error) {
        console.error(error);
      })
  );
};
