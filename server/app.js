const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");

const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

app.use(cors());
app.use(bodyParser.json());
const url = "mongodb://localhost:27017";

MongoClient.connect(
  url,
  { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err;
    const dbName = "week9db";
    const db = client.db(dbName);

    require("./routes/add.js")(db, app);
    require("./routes/list.js")(db, app);
    require("./routes/update.js")(db, app, ObjectID);
    require("./routes/remove.js")(db, app, ObjectID);

    //Start the server listening on port 3000. Outputs message to console once server has started
    require("./routes/listen.js")(http);
  }
);
