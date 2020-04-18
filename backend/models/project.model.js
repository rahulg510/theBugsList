const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {type: String, required: true, unique: true},
    users: [String]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;