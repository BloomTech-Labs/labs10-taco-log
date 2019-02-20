exports.up = function(knex) {
  return knex.schema.createTable("users", function(users) {
    users.increments("internal_Id").primary(); // create table 'users' with a primary key using 'increments()
    users
      .string("username", 128)      
      .unique();
    users.string("name")
    users.string("password", 128)
    users.string("department", 128) // id,
    users.string("email", 128)
    users.string("ext_user_id").unique();
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
