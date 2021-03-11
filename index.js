let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Settings = require('./src/Utils/Settings');
let Router = require('./src/Utils/Router');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(Settings.config.db, { useNewUrlParser: true});
var db = mongoose.connection;

if(!db) console.log("Error connecting db")
else console.log("Db connected successfully")

app.get('/', Settings.emptyPage);
app.use('/api', Router);
app.listen(Settings.config.port, Settings.startup);
