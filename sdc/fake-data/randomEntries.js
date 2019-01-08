const { givenNames, familyNames } = require('./userNameParts');
const { nouns, verbs } = require('./projectNameParts');

const randBelow = (N) => {
  return Math.floor(Math.random() * N);
}

const randCombo = (list1, list2) => {
  return list1[randBelow(list1.length)] + list2[randBelow(list2.length)];
}

const NUM_PROJECTS = 5000;
const newMockProject = () => {
  const project = {
    project_name: randBelow(2) ? randCombo(nouns, verbs) : randCombo(verbs, nouns),
  }
  return project;
}

const NUM_PLEDGES = 10e6 - NUM_PROJECTS;
const newMockPledge = () => {
  const pledge = {
    username: randCombo(givenNames, familyNames),
    project_id: randBelow(NUM_PROJECTS) + 1,
    pledge_amount: (randBelow(20000) + 1) / 100
  }
  return pledge;
}

module.exports = {
  NUM_PROJECTS,
  NUM_PLEDGES,
  newMockProject,
  newMockPledge
}