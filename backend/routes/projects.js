const router = require('express').Router();
const Project = require('../models/project.model')


router.route('/').get((req,res)=>{
    const username = req.openid.user.name;
    console.log(username);
    Project.find({"users": username})
    .then(data=>{
      res.json(data);
    })
    .catch(err=>{
      res.json("Error: " + err);
    })
  })


router.route('/add').post((req,res)=>{
    const projectName = req.body.projectName;
    const projectManager = req.openid.name || req.body.projectManager;
    const users = [projectManager];

    console.log(projectManager, projectName, users);

    const newProject = new Project({
        projectName,
        projectManager,
        users
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