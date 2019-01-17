const { Project, Pledge } = require('./models');
const { NUM_PLEDGES, NUM_PROJECTS } = require('../seeds/bigFakeData');
const faker = require('faker');

// INSERT PROJECTS IN ONE BATCH
// const insertProjects = () => {
//   faker.seed(78704);
//   let t0, t1;


//   t0 = process.hrtime();
//   const projects = [];
//   let project_name = '';

//   for (let i = 0; i < NUM_PROJECTS; i++) {
//     project_id = i;
//     project_name = faker.commerce.productName();
//     backer_count = NUM_PLEDGES / NUM_PROJECTS;
//     total_pledged = backer_count * 10;
//     funding_goal = faker.commerce.price() * 1000;
//     deadline = faker.date.between('2019-02-08', '2019-06-01');
//     projects.push({ project_id, project_name, backer_count, total_pledged, funding_goal, deadline });
//   }

//   return Project.insertMany(projects)
//     .then(() => {
//       t1 = process.hrtime(t0);
//       runtime = t1[0] + t1[1] / 1e9;
//       console.log(`Inserted ${NUM_PROJECTS} projects in ${runtime} seconds.`)
//     })
//     .catch(err => console.log('Error inserting projects.', err));
// }


let t0, t1;
const insertProjects = async () => {
  faker.seed(78704);

  t0 = process.hrtime();
  let pledges = [];
  let project_name = '';
  let username, project_id, pledge_id;
  const pledge_amount = 10;
  const pledgesPerProject = NUM_PLEDGES / NUM_PROJECTS
  // const promises = [];

  for (let i = 0; i < NUM_PROJECTS; i++) {
    project_id = i + 1;
    project_name = faker.commerce.productName();
    backer_count = NUM_PLEDGES / NUM_PROJECTS;
    total_pledged = backer_count * 10;
    funding_goal = faker.commerce.price() * 1000;
    deadline = faker.date.between('2019-02-08', '2019-06-01');

    pledges = [];
    for (let j = 0; j < pledgesPerProject; j++) {
      pledge_id = j + 1;
      username = faker.internet.userName();
      date_created = faker.date.recent();
      pledges.push({ pledge_id, username, pledge_amount, date_created });
    }

    // promises.push(
    await Project.insertMany({ project_id, project_name, backer_count, total_pledged, funding_goal, deadline, pledges })
    // );
  }


  // return Promise.all(promises)
  //   .then(() => {
  //     t1 = process.hrtime(t0);
  //     runtime = t1[0] + t1[1] / 1e9;
  //     console.log(`Inserted ${NUM_PROJECTS} projects and ${NUM_PLEDGES} pledges in ${runtime} seconds.`)
  //   })
  //   .catch(err => console.log('Error inserting projects.', err));
}

insertProjects()
  .then(() => {
    t1 = process.hrtime(t0);
    runtime = t1[0] + t1[1] / 1e9;
    console.log(`Inserted ${NUM_PROJECTS} projects and ${NUM_PLEDGES} pledges in ${runtime} seconds.`)
  })
  .catch(err => console.log('Error inserting projects.', err));