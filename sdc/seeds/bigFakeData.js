const faker = require('faker');
const NUM_PROJECTS = 5000;
const NUM_PLEDGES = 1000; //10e6; // This is approximate unless it's a multiple of BATCH_SIZE
const BATCH_SIZE = 10; //10000; // used by .batchInsert
const BIGBATCH_SIZE = 100; //10e5; // I know groups of 10e5 work, but more might complain

exports.seed = function (knex, Promise) {
  faker.seed(78704);
  let t0, t1;

  return knex('pledges').del()
    .then(() => knex('projects').del())
    .then(() => knex.raw('ALTER TABLE projects AUTO_INCREMENT = 1'))
    .then(() => knex.raw('ALTER TABLE pledges AUTO_INCREMENT = 1'))
    .then(() => {
      t0 = process.hrtime();
      const projects = [];
      let project_name = '';
      for (let i = 0; i < NUM_PROJECTS; i++) {
        project_name = faker.commerce.productName();
        projects.push({ project_name });
      }
      return knex.batchInsert('projects', projects, BATCH_SIZE);
    })
    .then(() => {
      t1 = process.hrtime(t0);
      runtime = t1[0] + t1[1] / 1e9;
      console.log(`Inserted ${NUM_PROJECTS} projects in ${runtime} seconds.`)
    })
    .then(async () => {
      t0 = process.hrtime();
      let username, project_id, pledge_amount;
      for (let i = 0; i < NUM_PLEDGES / BIGBATCH_SIZE; i++) {
        const pledges = [];
        for (let j = 0; j < BIGBATCH_SIZE; j++) {
          username = faker.internet.userName();
          project_id = Math.floor(Math.random() * NUM_PROJECTS);
          pledge_amount = Math.floor(Math.random() * 10000) / 100;
          pledges.push({ username, project_id, pledge_amount })
        }
        await knex.batchInsert('pledges', pledges, BATCH_SIZE);
      }
    })
    .then(() => {
      t1 = process.hrtime(t0);
      runtime = t1[0] + t1[1] / 1e9;
      console.log(`Inserted ${NUM_PLEDGES} in ${runtime} seconds.`)
    })
    .catch(err => {
      console.log(`Error inserting into database: `, err)
    });
};
