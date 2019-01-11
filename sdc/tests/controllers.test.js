const db = require('../controllers/controllers');
require('dotenv').config();
const dboptions = require('../../knexfile')
const knex = require('knex')(dboptions[process.env.PLEDGES_DB_ENVIRONMENT]);
const { NUM_PLEDGES, NUM_PROJECTS } = require('../seeds/bigFakeData');

afterAll(() => knex.destroy());

describe('Database', () => {
  it('should add and retrieve a project', async () => {
    const project = {
      project_name: 'The one I added manually for testing'
    }
    const result = await knex('projects').insert(project);
    expect(result[0]).toBeGreaterThan(NUM_PROJECTS);
  });
})
// NEXT: QUERY THAT RESULT, THEN DELETE IT, THEN SET AUTO_INCREMENT BACK

// describe('Database controllers', () => {
//   it('should add and retrieve a project', () => {
//     const project = {
//       project_name = 'The one I added manually for testing';
//     }
//     knex('projects').insert(project)
//   })
// })