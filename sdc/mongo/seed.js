const { Project, Pledge } = require('./models');
const { NUM_PLEDGES, NUM_PROJECTS } = require('../seeds/bigFakeData');
// const NUM_PLEDGES = 100000;
// const NUM_PROJECTS = 500;
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
  let username, project_id = 0;
  let pledge_amount;
  let pledge_id = 0;
  let total_pledged = 0;
  let pledgesPerProject = NUM_PLEDGES / NUM_PROJECTS
  // const promises = [];

  // for (let i = 0; i < NUM_PROJECTS; i++) {
  while (pledge_id < NUM_PLEDGES) {
    project_id++;
    project_name = faker.commerce.productName();
    backer_count = 0;
    total_pledged = 0;
    funding_goal = faker.commerce.price() * 1000;
    deadline = faker.date.between('2019-02-08', '2019-06-01');

    pledges = [];

    // variance should gradually fall to zero at the last project, 
    //  ensuring an exact number of projects and pledges with nearly 100% chance.
    pledgesPerProject = Math.floor((NUM_PLEDGES - pledge_id) / (NUM_PROJECTS - project_id + 1)
      + Math.random() * Math.sqrt((NUM_PLEDGES - pledge_id - 1) / (NUM_PROJECTS - project_id + 1)));
    for (let j = 0; j < pledgesPerProject && pledge_id < NUM_PLEDGES; j++) {
      pledge_id++;
      username = faker.internet.userName();
      backer_count++;
      date_created = faker.date.recent();
      pledge_amount = faker.commerce.price();
      total_pledged += Number(pledge_amount);
      pledges.push({ pledge_id, username, pledge_amount, date_created });
    }
    // console.log(total_pledged);
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