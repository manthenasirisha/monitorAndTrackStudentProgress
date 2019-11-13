'use strict';

module.exports = function(app) {
  var studentController = require('../controller/studentController');
  var projectController = require('../controller/projectController');
  var batchController = require('../controller/batchController');
  var supervisorController = require('../controller/supervisorController');
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
  app.route('/student/:studentId/assignableProjects')
          .get(studentController.getAllAssignableProjectsForAStudent);
  app.route('/student/:studentId/supervisors')
        .get(studentController.getSupervisorsOfStudent);

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
  app.route('/project/:projectId/student')
      .get(projectController.getStudentOfProject);
  app.route('/project/:projectId/supervisors')
      .get(projectController.getSupervisorsOfProject);

  app.route('/project/:projectId/tracking')
      .post(projectController.saveProjectTracking);
  app.route('/project/:projectId/tracking/:trackingId')
       .put(projectController.updateProjectTracking);
  app.route('/project/:projectId/tracking/:trackingId')
        .get(projectController.getProjectPhase);
  app.route('/project/:projectId/tracking')
      .get(projectController.getProjectTracking);
  app.route('/project/:projectId/tracking/:trackingId/delete')
      .put(projectController.deleteProjectTracking);
  app.route('/project/:projectId/pending-phases')
        .get(projectController.getPendingPhasesOfProject);

     // project routes
    app.route('/supervisor')
    .post(supervisorController.saveSupervisor);
    app.route('/supervisor')
    .get(supervisorController.searchSupervisors);
    app.route('/supervisor/all')
    .get(supervisorController.getAllSupervisors);
    app.route('/supervisor/:supervisorId')
    .get(supervisorController.getSupervisor);
    app.route('/supervisor/:supervisorId')
    .post(supervisorController.deleteSupervisor);
    app.route('/supervisor/:supervisorId')
    .put(supervisorController.updateSupervisor);

    app.route('/supervisor/:supervisorId/projects')
    .get(supervisorController.supervisorProjects);

    app.route('/supervisor/:supervisorId/assign-project/project/:projectId')
    .put(supervisorController.assignProject);

    app.route('/supervisor/:supervisorId/un-assign-project/project/:projectId')
    .put(supervisorController.unAssignProject);

    app.route('/supervisor/:supervisorId/assignableProjects')
    .get(supervisorController.getAssignableProjects);
 };