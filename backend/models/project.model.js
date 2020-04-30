const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {type: String, required: true, unique: true},
    projectManager: {type: String, required: true},
    users: [String],
    issues: [String]
},{
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;