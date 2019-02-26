exports.up = function(knex) {
  return knex.schema.createTable("taco-log", function(tbl) {
    tbl.increments("id");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("internal_id")
      .inTable("users"); // id,
    tbl.string("taco_location");
    tbl.string("location_id");
    tbl.string("city");
    tbl.string("ingredients").notNullable();
    tbl.integer("special_experience").defaultTo(0);
    tbl.string("taco_name").notNullable();
    tbl.string("taco_description");
    tbl.decimal("rating", 0, 5);
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("taco-log");
};
