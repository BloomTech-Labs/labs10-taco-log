exports.up = function(knex) {
  return knex.schema.createTable("users", function(users) {
    users.increments("internal_Id").primary(); // create table 'users' with a primary key using 'increments()
    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
    users.string("department", 128).notNullable(); // id,
    users.string("email", 128).notNullable();
    users.integer("ext__user_id").unique();
    users
      .integer("taco_log_id")
      .unique()
      .unsigned()
      .references("id")
      .inTable("Taco-log_Table");
    users
      .integer("achievements_id")
      .unique()
      .unsigned()
      .references("id")
      .inTable("Achievements_Table");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
