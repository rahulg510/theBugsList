const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect');
let User = require('../models/user.model');
let Project = require('../models/project.model')

//router.use(requiresAuth());

router.route('/').get((req, res) => {
  //console.log(req.openid.user);
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //called every login
  const username = req.body.username;
  const projects = [];

  User.findOne({username}).
  then(data=>{
    if(data == null){
      const newUser = new User({username, projects});
      newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      res.json("user already exists");
    }
  })
  .catch(err=>{
    console.log(err);
  })

  
});



router.route('/project').put((req,res)=>{
  const username = req.body.username;
  const projectName = req.body.projectName;
  User.find({username})
  .then((data)=>{
    let item = data[0];
    let arr  = item['projects'];
    arr.push(projectName);
    item.save();
    res.send("project added to user");
  })
  .catch(err=>{
    console.error(err);
  })
})

router.route('/project').delete((req,res)=>{
  const username = req.body.username;
  const projectName = req.body.projectName;
  User.find({username})
  .then((data)=>{
    let item = data[0];
    let arr  = item['projects'];
    if(!arr.includes(projectName)){
      res.send("project doesn't exist");
    }
    else{
    arr.remove(projectName);
    item.save();
    res.send(arr);
    }
  })
  .catch(err=>{
    console.error(err);
  })
})

module.exports = router;