
exports.up = function(knex) {
    return createUsersTable(knex)
    .then()
      .catch(error => {
        console.log(error);
        reject(error);
      });
  };
  // create table 'users' with a primary key using 'increments()

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('')
    .then(function() {
      console.log('dropping Achievements_Table');
      return knex.schema.dropTableIfExists('Achievements_Table');
    })
    .then(function() {
      console.log('dropping Taco-log_Table');
      return knex.schema.dropTableIfExists('Taco-log_Table');
    })
    .then(function() {
      console.log('dropping users');
      return knex.schema.dropTableIfExists('users');
    })
    .catch(error => console.log(error));
};

function createUsersTable(knex) {
    console.log('creating users table');
  
    return new Promise(function(resolve, reject) {
      knex.schema
        .createTable('users', function(users) {
          users.increments("internal_Id").primary(); // id,
          users
          .integer('ext__user_id')
          .notNullable()
          .unique();
          users
          .integer('taco_log_id')
          .unique()
          .unsigned()
          .index()
          .references('id')
          .inTable('Taco-log_Table')
          console.log('users table created');
          users
          .integer('achievements_id')
          .unique()
          .unsigned()
          .index()
          .references('id')
          .inTable('Achievements_Table')
          console.log('users table created');
          resolve(knex);
        })
        .catch(error => reject(error));
    });
  }
  function createTacolog(knex) {
    console.log('creating taco table');
  
    return new Promise(function(resolve, reject) {
      knex.schema
        .createTable('Taco-log_Table', function(tacTable) {
        tacTable.increments("id"); // id,
        tacTable
          .stirng('taco_location')
          .unique();
        tacTable  
          .decimal('rating',0,5)
          
        tacTable
         .timestamp('created_at').defaultTo(knex.fn.now());
          console.log('taco table created');
          resolve(knex);
        })
        .catch(error => reject(error));
    });
  }
  function createTacolog(knex) {
    console.log('creating taco table');
  
    return new Promise(function(resolve, reject) {
      knex.schema
        .createTable('Taco-log_Table', function(tacTable) {
        tacTable.increments("id"); // id,
        tacTable
          .string('taco_location')
          .unique();
        tacTable  
          .decimal('rating',0,5);
        tacTable
         .timestamp('created_at').defaultTo(knex.fn.now());
          console.log('users table created');
          resolve(knex);
        })
        .catch(error => reject(error));
    });
  }
  function Create_Achievements_Table(knex) {
    console.log('creating taco table');
  
    return new Promise(function(resolve, reject) {
      knex.schema
        .createTable('Achievements_Table', function(tacTable) {
        tacTable.increments("id"); // id,
        tacTable
         .timestamp('created_at').defaultTo(knex.fn.now());
          console.log('users table created');
          resolve(knex);
        })
        .catch(error => reject(error));
    });
  }