const router = require('express').Router();
const Project = require('../models/project.model')



router.route('/add').post((req,res)=>{
    const projectName = req.body.projectName;
    const projectManager = req.openid.name || req.body.projectManager;
    const users = [projectManager];
    const issues = [];

    console.log(projectManager, projectName, users, issues);

    const newProject = new Project({
        projectName,
        projectManager,
        users,
        issues
    })

    newProject.save((err,data)=>{
        if(err) {
            console.error(err);
            res.json("project could not be added")
        }
        else{
            console.log(data);
            res.json("project created");
        }

    })

})

module.exports = router;