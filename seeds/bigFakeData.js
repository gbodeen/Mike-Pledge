
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('pledges').del()
    .then(() => knex('projects').del())
    .then(() => knex.raw('ALTER TABLE projects AUTO_INCREMENT = 1'))
    .then(() => knex.raw('ALTER TABLE pledges AUTO_INCREMENT = 1'))
    .then(() => knex('projects').insert({ project_name: 'Petsy' }));
};
