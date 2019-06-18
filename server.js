const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const serverConfig = require("./config/database");
const server = http.createServer(app);

const buckets = require("./routes/api/buckets");
const users = require("./routes/api/users");

// Connect to MongoDB
mongoose.connect(
    serverConfig.mongoURL,
    { useNewUrlParser: true },
    (err) => {
      if (err) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw err;
      }
    }
  )
  .then(() => console.log("MongoDB successfully connected"));

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
  .listen(port, () => console.log(`Server up and running on port ${port} !`));
//mongoose.connect(config.DB,{ useNewUrlParser: true });
