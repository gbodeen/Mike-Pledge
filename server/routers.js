const express = require("express");
const router = express.Router();
const bodyparser = require('body-parser');
const {
  addNewProject,
  addNewPledge,
  addPledgeToProject,
  getProjectDetails,
  getPledgeDetails,
  deletePledge,
  deleteProject
} = require('../sdc/controllers/controllers');

router.get('/pledges/:pledge_id', function (req, res) {
  const pledge_id = req.params.pledge_id;
  getPledgeDetails({ pledge_id })
    .then(details => {
      res.status(200).send(details);
    })
    .catch(err => {
      console.log('Error retrieving pledge details.', err);
      res.status(500).send('Error retrieving pledge details.')
    });
});

router.get('/projects/:project_id', function (req, res) {
  const project_id = req.params.project_id;
  getProjectDetails({ project_id })
    .then(details => {
      res.status(200).send(details);
    })
    .catch(err => {
      console.log('Error retrieving project details.', err);
      res.status(500).send('Error retrieving project details.')
    });
});

router.post('/pledge', bodyparser.json(), function (req, res) {
  console.log('POSTED TO PLEDGES: ', req.body, req.json);
});

router.post('/project', bodyparser.json(), function (req, res) {
  res.send('About birds')
});

router.patch('/pledges/:pledge_id', bodyparser.json(), function (req, res) {
  res.send('About birds')
});

router.patch('/projects/:project_id', bodyparser.json(), function (req, res) {
  res.send('About birds')
});

router.delete('/pledges/:pledge_id', function (req, res) {
  res.send('About birds')
});

router.delete('/projects/:project_id', function (req, res) {
  res.send('About birds')
});

module.exports = router;