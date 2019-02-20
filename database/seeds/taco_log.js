
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('taco-log').del()
    .then(function () {
      // Inserts seed entries
      return knex('taco-log').insert([
        {id: 1, user_id: 1, taco_location: 'Big Taco', taco_description: 'I had a big taco', rating: 4},
        {id: 2, user_id: 1, taco_location: 'Little Taco', taco_description: 'I had a little taco.', rating: 4},
        {id: 3, user_id: 1, taco_location: 'Huge Taco', taco_description: 'I had a huge taco.', rating: 4},
        {id: 4, user_id: 2, taco_location: 'Big Taco', taco_description: 'I had a big taco', rating: 4},
        {id: 5, user_id: 2, taco_location: 'Little Taco', taco_description: 'I had a little taco.', rating: 4},
        {id: 6, user_id: 3, taco_location: 'Huge Taco', taco_description: 'I had a huge taco.', rating: 4},
        {id: 7, user_id: 4, taco_location: 'Big Taco', taco_description: 'I had a big taco', rating: 4},
        {id: 8, user_id: 4, taco_location: 'Little Taco', taco_description: 'I had a little taco.', rating: 4},
        {id: 9, user_id: 5, taco_location: 'Huge Taco', taco_description: 'I had a huge taco.', rating: 4},
        {id: 10, user_id: 5, taco_location: 'Big Taco', taco_description: 'I had a big taco', rating: 4},
        {id: 11, user_id: 5, taco_location: 'Little Taco', taco_description: 'I had a little taco.', rating: 4},
        {id: 12, user_id: 6, taco_location: 'Huge Taco', taco_description: 'I had a huge taco.', rating: 4}
      ]);
    });
};
