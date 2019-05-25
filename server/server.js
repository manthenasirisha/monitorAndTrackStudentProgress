const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = process.env.PORT || 3000;
const app = express();

//mysql connection
const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monitor_student_performance'
});
databaseConnection.connect();


// json parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app to listen to port
app.listen(port);

//register the route
var routes = require('./app/route/appRoutes'); //importing route
routes(app);

console.log('server started on post number ' + port);