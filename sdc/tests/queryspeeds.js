// write essentially similar queries for MySQL and MongoDB
// time them running as a comparison
// the queries should be realistic
// e.g. 
//    add a pledge to a project & get the updated project total & backers 
//    remove that pledge & get the same sort of update

// require('newrelic');
// const {getProjectDetails, getPledgeDetails} = require('../controllers/controllers');
const { getProjectDetails, getPledgeDetails } = require('../mongo/controllers');
const { NUM_PROJECTS } = require('../seeds/bigFakeData');
const NUM_QUERIES = 1000;
const colors = require('colors');

const mongoQueries = () => {
  let t0 = process.hrtime(), t1, runtime; // start timer
  let project_id;

  for (let i = 0; i < NUM_QUERIES; i++) {
    project_id = Math.floor(Math.random() * NUM_PROJECTS) + 1;
    getProjectDetails({ project_id })
      .then(() => {
        t1 = process.hrtime(t0);
        runtime = t1[0] + t1[1] / 1e9;
      });
  }

  setTimeout(() => {
    totalTime = runtime; //runtimes.reduce((sum, el) => sum + el, 0);
    avgTime = totalTime / NUM_QUERIES;
    rate = 1 / avgTime;
    console.log(`Running ${NUM_QUERIES} queries took a total of ${totalTime} seconds, averaging ${avgTime} per query.
    That's an average rate of ${rate} queries per second.`.green);
  }, NUM_QUERIES * 10);

}

mongoQueries();