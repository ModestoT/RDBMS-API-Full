
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Billy', cohorts_id: 1},
        { name: 'Bobby', cohorts_id: 2},
        { name: 'Sammy', cohorts_id: 3}
      ])
    });
};
