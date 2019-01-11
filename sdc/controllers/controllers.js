require('dotenv').config();
const knex = require('../../knexfile')(PLEDGES_DB_ENVIRONMENT);

const addNewProject = (project_name) => {
  return knex('projects').insert({ project_name })
}

const addNewPledge = (pledge) => {
  return knex('pledges').insert(pledge)
    .then(() => updateProject(pledge.project_id, pledge.pledge_amount));
}

const updateProject = (project_id, pledge_amount) => {
  return knex('projects').where({ project_id }).increment({ 'total_pledged': pledge_amount, 'backer_count': 1 });
}

const getProjectDetails = (project_id) => {
  return knex('projects').where({ project_id }).select();
}
