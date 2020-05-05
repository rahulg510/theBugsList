const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
let User = require('./models/user.model');

app.use(bodyparser());
app.use(cors());
app.use(express.json());

const { auth, requiresAuth} = require('express-openid-connect');

config = {
  required: false,
  auth0Logout: true,
  appSession: {
    secret: process.env.AUTHSEC
  },
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUERBASE
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {

  const username = req.openid.user["name"];
  User.findOne({username})
  .then(data=>{
    let projects = data['projects'];
    if(projects.length == 0){
      res.send("You have no projects");
    }
    else{
    console.log(projects);
    res.send(projects);
    }
  })
  .catch(err=>{
    console.log(err);
  })
});

const MONGO = process.env.DATABASE;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const issuesRouter = require('./routes/issues');
const usersRouter = require('./routes/users');
const projectRouter = require('./routes/projects');

app.use('/issues',requiresAuth(), issuesRouter);
app.use('/users', requiresAuth(),usersRouter);
app.use('/project',requiresAuth(), projectRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
