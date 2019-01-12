const db = require('../controllers/controllers');
require('dotenv').config();
const dboptions = require('../../knexfile')
const knex = require('knex')(dboptions[process.env.PLEDGES_DB_ENVIRONMENT]);
const { NUM_PLEDGES, NUM_PROJECTS } = require('../seeds/bigFakeData');

describe('Database schema', () => {
  it('should add and retrieve a project using KNEX', async () => {
    const project = {
      project_name: 'The one I added manually for testing'
    }
    const project_id = (await knex('projects').insert(project))[0];
    expect(project_id).toBeGreaterThan(NUM_PROJECTS);
    const project_name = (await knex('projects').select('project_name').where({ project_id }))[0].project_name;
    expect(project_name).toBe(project.project_name);
    await knex('projects').where('project_id', '>', NUM_PROJECTS).del();
    const extraInsertions = (await knex('projects').where('project_id', '>', NUM_PROJECTS).count('project_id'))[0]['count(`project_id`)'];
    expect(extraInsertions).toEqual(0);
    await knex.raw(`ALTER TABLE projects AUTO_INCREMENT = ${NUM_PROJECTS + 1}`);
  });

  it('should add and retrieve a pledge using KNEX', async () => {
    const pledge = {
      username: 'Garfunkel',
      project_id: NUM_PROJECTS + 777,
      pledge_amount: 77.77
    }
    const pledge_id = (await knex('pledges').insert(pledge))[0];
    expect(pledge_id).toBeGreaterThan(NUM_PLEDGES);
    const username = (await knex('pledges').select('username').where({ pledge_id }))[0].username;
    expect(username).toBe(pledge.username);
    await knex('pledges').where('pledge_id', '>', NUM_PLEDGES).del();
    const extraInsertions = (await knex('pledges').where('pledge_id', '>', `${NUM_PLEDGES}`).count('pledge_id'))[0]['count(`pledge_id`)'];
    expect(extraInsertions).toEqual(0);
    await knex.raw(`ALTER TABLE pledges AUTO_INCREMENT = ${NUM_PLEDGES + 1}`);
  })
});

describe('Database controllers', () => {
  it('should add and retrieve a project using controllers', async () => {
    const project = {
      project_name: 'Another one I added manually for testing',
    }
    const project_id = (await db.addNewProject(project.project_name))[0];
    expect(project_id).toBeGreaterThan(NUM_PROJECTS);
    const project_name = (await db.getProjectDetails({ project_id }))[0].project_name;
    expect(project_name).toBe(project.project_name);
    await db.deleteProject({ project_id });
    const extraInsertions = (await db.getProjectDetails(`project_id > ${NUM_PROJECTS}`).count('project_id'))[0]['count(`project_id`)'];
    expect(extraInsertions).toEqual(0);
    await knex.raw(`ALTER TABLE projects AUTO_INCREMENT = ${NUM_PROJECTS + 1}`);
  })
})

afterAll(() => knex.destroy());