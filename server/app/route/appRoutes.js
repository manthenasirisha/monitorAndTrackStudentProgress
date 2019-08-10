'use strict';

module.exports = function(app) {
  var studentController = require('../controller/studentController');
  var projectController = require('../controller/projectController');
  var batchController = require('../controller/batchController');
  var cors = require('cors');

  app.use(cors());
  app.options('*', cors());

  // student
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

  // project routes
  app.route('/project')
   .post(projectController.saveProject);
  app.route('/project')
   .get(projectController.searchProjects);
  app.route('/project/all')
   .get(projectController.getAllProjects);
  app.route('/project/:projectId')
   .get(projectController.getProject);
  app.route('/project/:projectId')
   .post(projectController.deleteProject);
  app.route('/project/:projectId')
   .put(projectController.updateProject);

 };