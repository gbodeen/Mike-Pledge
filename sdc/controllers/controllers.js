require('dotenv').config();
const dboptions = require('../../knexfile')
const knex = require('knex')(dboptions[process.env.PLEDGES_DB_ENVIRONMENT]);

const addNewProject = (project) => {
  return knex('projects').insert(project);
}

const addNewPledge = (pledge) => {
  return knex('pledges').insert(pledge)
    .then(() =>
      addPledgeToProject(pledge.project_id, pledge.pledge_amount)
    );
}

const addPledgeToProject = (project_id, pledge_amount) => {
  return knex('projects').where({ project_id }).increment({ 'total_pledged': pledge_amount, 'backer_count': 1 });
}

const removePledgeFromProject = (project_id, pledge_amount) => {
  return knex('projects').where({ project_id }).decrement({ 'total_pledged': pledge_amount, 'backer_count': 1 });
}

const getProjectDetails = (matchCriteria) => {
  if (typeof matchCriteria === 'string') {
    return knex('projects').where(...matchCriteria.split(' ')).select();
  }
  return knex('projects').where(matchCriteria).select();
}

const getPledgeDetails = (matchCriteria) => {
  if (typeof matchCriteria === 'string') {
    return knex('pledges').where(...matchCriteria.split(' ')).select();
  }
  return knex('pledges').where(matchCriteria).select();
}

const deleteProject = (matchCriteria) => {
  return knex('projects').where(matchCriteria).del();
}

const deletePledge = (matchCriteria) => {
  return getPledgeDetails(matchCriteria)
    .then(pledgeArray => {
      const { project_id, pledge_amount } = pledgeArray[0];
      return removePledgeFromProject(project_id, pledge_amount);
    })
    .then(() => knex('pledges').where(matchCriteria).del());
}

module.exports = {
  addNewProject,
  addNewPledge,
  addPledgeToProject,
  getProjectDetails,
  getPledgeDetails,
  deletePledge,
  deleteProject
}