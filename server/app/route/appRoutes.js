'use strict';

module.exports = function(app) {
  var studentController = require('../controller/studentController');
  var batchController = require('../controller/batchController');
  var cors = require('cors');

  app.use(cors());
  app.options('*', cors());

  app.route('/student')
    .post(studentController.saveStudent);

 app.route('/student')
   .get(studentController.searchStudent);

  app.route('/student/all')
     .get(studentController.getAllStudents);
  app.route('/student/:studentId')
       .get(studentController.getStudent);
  app.route('/student/:studentId')
        .post(studentController.deleteStudent);
  app.route('/student/:studentId')
        .put(studentController.updateStudent);

  app.route('/batch/all')
    .get(batchController.getAllBatches);

 };