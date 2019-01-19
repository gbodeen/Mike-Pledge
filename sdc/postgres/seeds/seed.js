const faker = require('faker');
const NUM_PROJECTS = 5000;
const NUM_PLEDGES = 10e6;
const BATCH_SIZE = 10000; // used by .batchInsert

function seed(knex, Promise) {
  faker.seed(78704);
  let t0, t1;

  return knex('pledges').del()
    .then(() => knex('projects').del())
    .then(() => knex.raw('ALTER SEQUENCE pledges_pledge_id_seq RESTART WITH 1'))
    .then(() => knex.raw('ALTER SEQUENCE projects_project_id_seq RESTART WITH 1'))
    .then(() => {
      // INSERT PROJECTS IN ONE BATCH
      t0 = process.hrtime();
      const projects = [];
      let project_name = '';
      for (let i = 0; i < NUM_PROJECTS; i++) {
        project_name = faker.commerce.productName();
        backer_count = NUM_PLEDGES / NUM_PROJECTS;
        total_pledged = backer_count * 10;
        funding_goal = faker.commerce.price() * 1000;
        deadline = faker.date.between('2019-02-08', '2019-06-01');
        projects.push({ project_name, backer_count, total_pledged, funding_goal, deadline });
      }
      return knex.batchInsert('projects', projects, BATCH_SIZE);
    })
    .then(() => {
      t1 = process.hrtime(t0);
      runtime = t1[0] + t1[1] / 1e9;
      console.log(`Inserted ${NUM_PROJECTS} projects in ${runtime} seconds.`)
    })
    .then(async () => {
      let pledgesPerProject, username, backer_count, date_created, pledge_amount, total_pledged, pledges;
      let pledge_id = 0;

      for (let project_id = 1; project_id <= NUM_PROJECTS; project_id++) {
        // variance should gradually fall to zero at the last project, 
        //  ensuring an exact number of projects and pledges with nearly 100% chance.
        pledgesPerProject = Math.floor((NUM_PLEDGES - pledge_id) / (NUM_PROJECTS - project_id + 1)
          + Math.random() * Math.sqrt((NUM_PLEDGES - pledge_id - 1) / (NUM_PROJECTS - project_id + 1)));

        backer_count = 0;
        total_pledged = 0;
        pledges = [];

        for (let j = 0; j < pledgesPerProject && pledge_id < NUM_PLEDGES; j++) {
          pledge_id++;
          username = faker.internet.userName();
          backer_count++;
          date_created = faker.date.recent();
          pledge_amount = faker.commerce.price();
          total_pledged += Number(pledge_amount);
          pledges.push({ pledge_id, project_id, username, pledge_amount, date_created });
        }

        await knex.batchInsert('pledges', pledges, BATCH_SIZE)
          .then(() => {
            return knex('projects').where({ project_id }).update({ total_pledged, backer_count });
          });
      }
    })
    .then(() => {
      t1 = process.hrtime(t0);
      runtime = t1[0] + t1[1] / 1e9;
      console.log(`Inserted ${NUM_PLEDGES} pledges in ${runtime} seconds.`);
    })
    .catch(err => {
      console.log(`Error inserting into database: `, err);
    });
};

module.exports = {
  seed,
  NUM_PROJECTS,
  NUM_PLEDGES
}