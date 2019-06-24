const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const app = express();
const config = require("./config/database");
const server = http.createServer(app);

const buckets = require("./routes/api/buckets");
const users = require("./routes/api/users");

const Role = require("./models/roles.model");

// Connect to MongoDB
mongoose.connect( config.mongoURL, { useNewUrlParser: true } )
.then( (err) => {
  if (!err) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw err;
  }

  console.log("MongoDB successfully connected");

  Role.countDocuments( (err, count) => {
    if(!err && count === 0) {
      // USER Role ->
      new Role({
        name: 'USER'
      }).save( err => {
        if(err) return console.error(err.stack)
        console.log("USER_ROLE is added")
      });

      // ADMIN Role ->
      new Role({
        name: 'ADMIN'
      }).save( err => {
        if(err) return console.error(err.stack)
        console.log("ADMIN_ROLE is added")
      });

    }
  });

}).catch((err) => console.log(err));

app
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(cors())
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
  .use("/api/users", users)
  .use("/api/buckets", buckets)
  .listen(config.port, () => console.log(`Server up and running on port ${config.port} !`));
//mongoose.connect(config.DB,{ useNewUrlParser: true });
