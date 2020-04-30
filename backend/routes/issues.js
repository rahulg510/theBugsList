const router = require('express').Router();
let Issue = require('../models/issue.model');

router.route('/').get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const issueName = req.body.issueName;
  const description = req.body.description;
  const priority = req.body.priority;
  const projectId = req.body.projectId;
  const assignedTo = req.body.assignedTo || "";
  const loggedBy = req.body.loggedBy;
  const status = req.body.status || "open"

  const newIssue = new Issue({
    issueName,
    description,
    priority,
    projectId,
    assignedTo,
    loggedBy,
    status
  });

  newIssue.save()
  .then(() => res.json('Issue added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json('Issue deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => {
      issue.issueName = req.body.issueName || req.body.issueName;
      issue.description = req.body.description || req.body.description;
      issue.priority = req.body.priority || issue.priority;
      issue.projectId = issue.projectId;
      issue.assignedTo = req.body.assignedTo || issue.assignedTo;
      issue.loggedBy = issue.loggedBy;
      issue.status = req.body.status || issue.status;

      issue.save()
        .then(() => res.json('Issue updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;