const mongoose = require('mongoose');


const IssueSchema = new mongoose.Schema({
  issueName: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  projectId: {type: String, require:true},
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;