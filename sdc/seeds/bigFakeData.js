const faker = require('faker');
const NUM_PROJECTS = 5000;
const NUM_PLEDGES = 10e6;
const BATCH_SIZE = 10000; // used by .batchInsert

exports.seed = function (knex, Promise) {
  faker.seed(78704);
  let t0, t1;

  return knex('pledges').del()
    .then(() => knex('projects').del())
    .then(() => knex.raw('ALTER TABLE projects AUTO_INCREMENT = 1'))
    .then(() => knex.raw('ALTER TABLE pledges AUTO_INCREMENT = 1'))
    .then(() => {
      // INSERT PROJECTS IN ONE BATCH
      t0 = process.hrtime();
      const projects = [];
      let project_name = '';
      for (let i = 0; i < NUM_PROJECTS; i++) {
        project_name = faker.commerce.productName();
        backer_count = NUM_PLEDGES / NUM_PROJECTS;
        total_pledged = backer_count * 20;
        projects.push({ project_name, backer_count, total_pledged });
      }
      return knex.batchInsert('projects', projects, BATCH_SIZE);
    })
    .then(() => {
      t1 = process.hrtime(t0);
      runtime = t1[0] + t1[1] / 1e9;
      console.log(`Inserted ${NUM_PROJECTS} projects in ${runtime} seconds.`)
    })
    .then(async () => {
      // INSERT PLEDGES IN SEVERAL BIGBATCHES OF BATCHES
      t0 = process.hrtime();
      let username, project_id;
      const pledge_amount = 20;
      for (let i = 0; i < NUM_PLEDGES / NUM_PROJECTS; i++) {
        const pledges = [];
        for (let project_id = 1; project_id <= NUM_PROJECTS; project_id++) {
          username = faker.internet.userName();
          pledges.push({ username, project_id, pledge_amount })
        }
        await knex.batchInsert('pledges', pledges);
      }
    })
    .then(() => {
      t1 = process.hrtime(t0);
      runtime = t1[0] + t1[1] / 1e9;
      console.log(`Inserted ${NUM_PLEDGES} pledges in ${runtime} seconds.`)
    })
    .catch(err => {
      console.log(`Error inserting into database: `, err)
    });
};

module.exports = {
  NUM_PLEDGES,
  NUM_PROJECTS
}