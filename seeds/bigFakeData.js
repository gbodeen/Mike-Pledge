const faker = require('faker');
const NUM_PROJECTS = 4;
const NUM_PLEDGES = 10;

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('pledges').del()
    .then(() => knex('projects').del())
    .then(() => knex.raw('ALTER TABLE projects AUTO_INCREMENT = 1'))
    .then(() => knex.raw('ALTER TABLE pledges AUTO_INCREMENT = 1'))
    .then(() => {
      const promises = [];
      let project_name = '';
      for (let i = 0; i < NUM_PROJECTS; i++) {
        project_name = faker.commerce.productName();
        promises.push(knex('projects').insert({ project_name }));
      }
      return Promise.all(promises);
    })
    .then(() => console.log('Insertions completed'))
    .catch(err => console.log('Error with insertions: ', err));
};
