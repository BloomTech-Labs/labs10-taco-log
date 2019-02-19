
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('achievements').del()
    .then(function () {
      // Inserts seed entries
      return knex('achievements').insert([
        {id: 1, title: 'Tuesday Reserved', description: 'Log a taco on tuesday for 5 weeks.'},
        {id: 2, title: 'Logger', description: 'Log 20 tacos'},
        {id: 3, title: 'Expert Logger', description: 'Log 50 tacos'}
      ]);
    });
};
