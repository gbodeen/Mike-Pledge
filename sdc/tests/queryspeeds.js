// write essentially similar queries for MySQL and MongoDB
// time them running as a comparison
// the queries should be realistic
// e.g. 
//    add a pledge to a project & get the updated project total & backers 
//    remove that pledge & get the same sort of update

// require('newrelic');
// const {getProjectDetails, getPledgeDetails} = require('../controllers/controllers');
const mongo = require('../mongo/controllers');
const mysql = require('../controllers/controllers');
const { NUM_PROJECTS, NUM_PLEDGES } = require('../seeds/bigFakeData');
const NUM_QUERIES = 1000;
const colors = require('colors');

const mongoProjectQuery = () => {
  let t0 = process.hrtime(), t1, runtime; // start timer
  let project_id;
  const promises = [];

  for (let i = 0; i < NUM_QUERIES; i++) {
    project_id = Math.floor(Math.random() * NUM_PROJECTS) + 1;
    promises.push(mongo.getProjectDetails({ project_id })
      .then(() => {
        t1 = process.hrtime(t0);
        runtime = t1[0] + t1[1] / 1e9;
      }));
  }

  return Promise.all(promises).then(() => {
    totalTime = runtime; //runtimes.reduce((sum, el) => sum + el, 0);
    avgTime = totalTime / NUM_QUERIES;
    rate = 1 / avgTime;
    console.log(`Running ${NUM_QUERIES} MongoDB project queries took a total of ${totalTime.toPrecision(5)} seconds, 
    averaging ${avgTime.toPrecision(5)} per query. That's an average rate of ${rate.toPrecision(5)} queries per second.`.red);
  });

}


const mongoPledgeQuery = () => {
  let t0 = process.hrtime(), t1, runtime; // start timer
  let pledge_id;
  const promises = [];

  for (let i = 0; i < NUM_QUERIES; i++) {
    pledge_id = Math.floor(Math.random() * NUM_PLEDGES) + 1;
    promises.push(mongo.getPledgeDetails({ pledge_id })
      .then(() => {
        t1 = process.hrtime(t0);
        runtime = t1[0] + t1[1] / 1e9;
      }));
  }

  return Promise.all(promises).then(() => {
    totalTime = runtime; //runtimes.reduce((sum, el) => sum + el, 0);
    avgTime = totalTime / NUM_QUERIES;
    rate = 1 / avgTime;
    console.log(`Running ${NUM_QUERIES} MongoDB pledge queries took a total of ${totalTime.toPrecision(5)} seconds, 
    averaging ${avgTime.toPrecision(5)} per query. That's an average rate of ${rate.toPrecision(5)} queries per second.`.green);
  });

}

const mysqlProjectQuery = () => {
  let t0 = process.hrtime(), t1, runtime; // start timer
  let project_id;
  const promises = [];

  for (let i = 0; i < NUM_QUERIES; i++) {
    project_id = Math.floor(Math.random() * NUM_PROJECTS) + 1;
    promises.push(mysql.getProjectDetails({ project_id })
      .then(() => {
        t1 = process.hrtime(t0);
        runtime = t1[0] + t1[1] / 1e9;
      }));
  }

  return Promise.all(promises).then(() => {
    totalTime = runtime; //runtimes.reduce((sum, el) => sum + el, 0);
    avgTime = totalTime / NUM_QUERIES;
    rate = 1 / avgTime;
    console.log(`Running ${NUM_QUERIES} MySQL project queries took a total of ${totalTime.toPrecision(5)} seconds, 
    averaging ${avgTime.toPrecision(5)} per query. That's an average rate of ${rate.toPrecision(5)} queries per second.`.yellow);
  });

}

const mysqlPledgeQuery = () => {
  let t0 = process.hrtime(), t1, runtime; // start timer
  let pledge_id;
  const promises = [];

  for (let i = 0; i < NUM_QUERIES; i++) {
    pledge_id = Math.floor(Math.random() * NUM_PLEDGES) + 1;
    promises.push(mysql.getPledgeDetails({ pledge_id })
      .then(() => {
        t1 = process.hrtime(t0);
        runtime = t1[0] + t1[1] / 1e9;
      }));
  }

  return Promise.all(promises).then(() => {
    totalTime = runtime; //runtimes.reduce((sum, el) => sum + el, 0);
    avgTime = totalTime / NUM_QUERIES;
    rate = 1 / avgTime;
    console.log(`Running ${NUM_QUERIES} MySQL pledge queries took a total of ${totalTime.toPrecision(5)} seconds, 
    averaging ${avgTime.toPrecision(5)} per query. That's an average rate of ${rate.toPrecision(5)} queries per second.`.blue);
  });

}



const runEachInTurn = async () => {
  await mongoProjectQuery();
  await mongoPledgeQuery();
  await mysqlProjectQuery();
  mysqlPledgeQuery();
}

runEachInTurn();
