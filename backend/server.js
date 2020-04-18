const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyparser());
app.use(cors());
app.use(express.json());

const MONGO = 'mongodb+srv://rahulg510:admin123@cluster0-ulnzk.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const issuesRouter = require('./routes/issues');
const usersRouter = require('./routes/users');

app.use('/issues', issuesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
