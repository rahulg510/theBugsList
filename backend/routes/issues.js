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
  const date = Date.parse(req.body.date);

  const newIssue = new Issue({
    issueName,
    description,
    priority,
    date,
    projectId
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

router.route('/update/:id').post((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => {
      issue.issueName = req.body.issueName;
      issue.description = req.body.description;
      issue.priority = req.body.priority;
      issue.date = Date.parse(req.body.date);
      issue.projectId = req.body.projectId || issue.projectId;

      issue.save()
        .then(() => res.json('Issue updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;