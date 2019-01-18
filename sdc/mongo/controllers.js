// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/pledges', { useNewUrlParser: true });
const { Project, Pledge } = require('./models');
const { NUM_PROJECTS, NUM_PLEDGES } = require('../seeds/bigFakeData');

const decimal128toString = (decimal128) => JSON.parse(JSON.stringify(decimal128))['$numberDecimal'];

const getProjectDetails = (matchCriteria) => {
  const projection = { project_name: 1, backer_count: 1, total_pledged: 1, funding_goal: 1, deadline: 1, _id: 0 };
  return Project.findOne(matchCriteria, projection).lean().exec()
    .then(result => {
      result.total_pledged = decimal128toString(result.total_pledged);
      result.funding_goal = decimal128toString(result.funding_goal);
      return result;
    })
    .catch(err => console.log('Error retrieving data from the database for match criteria:  ', matchCriteria, err));
}

const getPledgeDetails = (matchCriteria) => {
  const subDocumentMatch = { 'pledges.pledge_id': matchCriteria.pledge_id };
  const projection = {
    project_name: 1, backer_count: 1, total_pledged: 1, funding_goal: 1, deadline: 1,
    _id: 0, pledges: { $elemMatch: { pledge_id: matchCriteria.pledge_id } }
  };
  return Project.findOne(subDocumentMatch, projection).lean().exec()
    .then(result => {
      result.total_pledged = decimal128toString(result.total_pledged);
      result.funding_goal = decimal128toString(result.funding_goal);
      return result;
    });
}


module.exports = {
  getProjectDetails,
  getPledgeDetails
}