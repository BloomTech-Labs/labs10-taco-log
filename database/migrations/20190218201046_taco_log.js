exports.up = function(knex) {
<<<<<<< HEAD
  return knex.schema.createTable('taco-log', function(tbl) {
  tbl.increments("id");
  tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('internal_Id')
    .inTable('users') // id,
  tbl
    .string('taco_location')    
  tbl
    .string('taco_description')
  tbl  
    .decimal('rating',0,5)
  tbl
    .timestamp('created_at').defaultTo(knex.fn.now()); 
  })
=======
  return knex.schema.createTable("taco-log", function(tacTable) {
    tacTable.increments("id"); // id,
    tacTable.string("taco_location").unique();
    tacTable.decimal("rating", 0, 5);
    tacTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
>>>>>>> 164063e5129eeafe7b8f301ba8402fc2a03bdd46
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("taco-log");
};
