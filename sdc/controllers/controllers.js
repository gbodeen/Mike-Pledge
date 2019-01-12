require('dotenv').config();
const dboptions = require('../../knexfile')
const knex = require('knex')(dboptions[process.env.PLEDGES_DB_ENVIRONMENT]);

const addNewProject = (project_name) => {
  return knex('projects').insert({ project_name })
}

const addNewPledge = (pledge) => {
  return knex('pledges').insert(pledge)
    .then(() => addPledgeToProject(pledge.project_id, pledge.pledge_amount));
}

const addPledgeToProject = (project_id, pledge_amount) => {
  return knex('projects').where({ project_id }).increment({ 'total_pledged': pledge_amount, 'backer_count': 1 });
}

const getProjectDetails = (matchCriteria) => {
  if (typeof matchCriteria === 'string') {
    return knex('projects').where(...matchCriteria.split(' ')).select();
  }
  return knex('projects').where(matchCriteria).select();
}

const getPledgeDetails = (matchCriteria) => {
  return knex('pledges').where(matchCriteria).select();
}

const deleteProject = (matchCriteria) => {
  return knex('projects').where(matchCriteria).del();
}

const deletePledge = (matchCriteria) => {
  return knex('pledges').where(matchCriteria).del();
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