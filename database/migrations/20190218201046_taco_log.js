
exports.up = function(knex) {
  return knex.schema.createTable('taco-log', function(tacTable) {
  tacTable.increments("id"); // id,
  tacTable
    .string('taco_location')
    .unique();
  tacTable  
    .decimal('rating',0,5)
  tacTable
    .timestamp('created_at').defaultTo(knex.fn.now()); 
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('taco-log');
};
