const faker = require('faker');
const NUM_PROJECTS = 5000;//500;
const NUM_PLEDGES = 10e6;//10e3; // This is approximate unless it's a multiple of BATCH_SIZE
const BATCH_SIZE = 10000; // used by .batchInsert
const BIGBATCH_SIZE = 10e5; // I know groups of 10e5 work, but more might complain

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

// exports.seed = function (knex, Promise) {
//   let t0, t1;
//   // Deletes ALL existing entries
//   return knex('pledges').del()
//     .then(() => knex('projects').del())
//     .then(() => knex.raw('ALTER TABLE projects AUTO_INCREMENT = 1'))
//     .then(() => knex.raw('ALTER TABLE pledges AUTO_INCREMENT = 1'))
//     // .then(() => knex.raw('SET autocommit = 0'))
//     .then(() => knex.raw('SET foreign_key_checks=0'))
//     .then(() => {
//       t0 = process.hrtime();
//       const promises = [];
//       let project_name = '';
//       for (let i = 0; i < NUM_PROJECTS; i++) {
//         project_name = faker.commerce.productName();
//         promises.push(knex('projects').insert({ project_name }));
//       }
//       return Promise.all(promises);
//     })
//     .then(() => {
//       t1 = process.hrtime(t0);
//       runtime = t1[0] + t1[1] / 1e9;
//       console.log(`Inserted ${NUM_PROJECTS} projects in ${runtime} seconds.`)
//       // return knex.raw('COMMIT')
//     })
//     .then(() => {
//       const promises = [];
//       let username, project_id, pledge_amount;
//       let batch = [];
//       for (let i = 0; i < Math.ceil(NUM_PLEDGES / BATCH_SIZE); i++) {
//         // username = faker.internet.userName();
//         // project_id = Math.floor(Math.random() * NUM_PROJECTS) + 1;
//         // pledge_amount = Math.floor(Math.random() * 10000) / 100;
//         batch = [];
//         for (let j = 0; j < BATCH_SIZE; j++) {
//           username = faker.internet.userName();
//           project_id = Math.floor(Math.random() * NUM_PROJECTS) + 100;
//           pledge_amount = Math.floor(Math.random() * 10000) / 100;
//           batch.push({ username, project_id, pledge_amount })
//         }
//         promises.push(knex('pledges').insert(batch));
//         //promises.push(knex('projects').where({ project_id }).increment({ backer_count: 1, total_pledged: pledge_amount }));
//         //   calculate the above later with an awful query to make this "faster" :)
//       }
//       return Promise.all(promises);
//     })
//     // .then(() => knex.raw('COMMIT'))
//     .then(() => knex.raw('SET foreign_key_checks=1'))
//     // .then(() => knex.raw('SET autocommit = 1'))
//     .then(() => {
//       t1 = process.hrtime(t0);
//       runtime = t1[0] + t1[1] / 1e9;
//       console.log(`Run time was ${runtime} seconds for inserting ${NUM_PROJECTS} projects and ${NUM_PLEDGES} pledges.`);
//     })
//     .catch(err => {
//       t1 = process.hrtime(t0);
//       runtime = t1[0] + t1[1] / 1e9;
//       console.log(`Error inserting into database at ${runtime} seconds: `, err)
//     });
// };

