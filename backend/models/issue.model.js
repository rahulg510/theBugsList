const {Schema, model} = require('mongoose');

const IssueSchema = new Schema({
  issueName: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  projectId: {type: String, require:true},
  assignedTo: {type:String },
  loggedBy: {type:String, required: true},
  status: {type: String, required: true},
  //opened, modified, closed
}, {
  //automatically logs created and updated
  timestamps: true,
});

const Issue = model('Issue', IssueSchema);

module.exports = Issue;