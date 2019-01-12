const { getProjectDetails } = require('../sdc/controllers/controllers');


const validatePledge = async (pledge) => {
  // should include required fields
  if (!pledge.hasOwnProperty('project_id') || !pledge.hasOwnProperty('pledge_amount') || !pledge.hasOwnProperty('username')) {
    return false;
  }

  // should exclude forbidden fields
  if (pledge.hasOwnProperty('pledge_id')) {
    return false;
  }

  const { pledge_amount, project_id, username } = pledge;

  // should contain valid username
  if (typeof username !== 'string' || username.length < 3 || username.length > 255) {
    return false;
  }

  // should contain valid pledge amount
  if (typeof pledge_amount !== 'number' || pledge_amount <= 0 || pledge_amount !== Number(pledge_amount.toFixed(2))) {
    return false;
  }

  // should contain valid project_id
  const project = await getProjectDetails({ project_id })
  if (!Array.isArray(project) || project.length !== 1) {
    return false;
  }

  // if the pledge format is fine, return the required fields.
  return { pledge_amount, project_id, username };
}

const validateProject = (project) => {
  // should include required fields
  if (!project.hasOwnProperty('project_name')) {
    return false;
  }

  // should exclude forbidden fields
  if (project.hasOwnProperty('project_id')) {
    return false;
  }

  const { project_name } = project;

  // should contain valid project_name
  if (typeof project_name !== 'string' || project_name.length < 3 || project_name.length > 255) {
    return false;
  }

  // if all tests are fine, it's valid
  return { project_name };
}


module.exports = {
  validatePledge,
  validateProject
}