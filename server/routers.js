const express = require("express");
const router = express.Router();
const bodyparser = require('body-parser');
const {
  addNewProject,
  addNewPledge,
  getProjectDetails,
  getPledgeDetails,
  deletePledge,
  deleteProject
} = require('../sdc/controllers/controllers');
const { validatePledge, validateProject } = require('./validations');

router.get('/pledge/:pledge_id', (req, res) => {
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

router.get('/project/:project_id', (req, res) => {
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

router.post('/pledge', bodyparser.json(), async (req, res) => {
  const pledge = await validatePledge(req.body);
  if (!pledge) {
    res.status(400).send('Submitted pledge contains invalid information or is missing required information.');
  } else {
    addNewPledge(pledge)
      .then(() =>
        res.status(200).send('Submitted pledge successfully.')
      )
      .catch(err => {
        console.log('Error posting pledge.', pledge, err);
        res.status(500).send('Error posting pledge.');
      });
  }
});

router.post('/project', bodyparser.json(), (req, res) => {
  const project = validateProject(req.body);
  if (!project) {
    res.status(400).send('Submitted project contains invalid information or is missing required information.');
  } else {
    addNewProject(project)
      .then(() =>
        res.status(200).send('Submitted project successfully.')
      )
      .catch(err => {
        console.log('Error posting project.', project, err);
        res.status(500).send('Error posting project.');
      });
  }
});

// router.patch('/pledges/:pledge_id', bodyparser.json(), function (req, res) {
//   res.send('About birds')
// });

// router.patch('/projects/:project_id', bodyparser.json(), function (req, res) {
//   res.send('About birds')
// });

router.delete('/pledge/:pledge_id', (req, res) => {
  const pledge_id = req.params.pledge_id;
  deletePledge({ pledge_id })
    .then(() => {
      res.status(200).send(`Pledge with id ${pledge_id} has been deleted.`);
    })
    .catch(err => {
      console.log('Error deleting pledge.', err);
      res.status(500).send('Error deleting pledge.')
    });
});

router.delete('/project/:project_id', (req, res) => {
  const project_id = req.params.project_id;
  deleteProject({ project_id })
    .then(() => {
      res.status(200).send(`Project with id ${project_id} has been deleted.`);
    })
    .catch(err => {
      console.log('Error deleting project.', err);
      res.status(500).send('Error deleting project.')
    });
});

module.exports = router;