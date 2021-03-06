var Project = require('../model/project');

exports.saveProject = function(request, response) {

  Project.saveProject(request.body, function(err, savedProject) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if (err) {
      response.send(err);
      return;
    }

    response.send(savedProject);
  });

};

exports.updateProject = function(request, response) {

  Project.updateProject(request.body, function(err, savedProject) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   response.header('Access-Control-Allow-Methods: PUT');


    if (err) {
      response.send(err);
      return;
    }

    response.send(savedProject);
  });

};

exports.getAllProjects = function(request, response) {

  Project.getAllProjects(function(err, projects) {
    console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if (err) {
      response.send(err);
    }

    response.send(projects);
  });

};

exports.getProject = function(request, response) {

   var projectId = request.params.projectId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Project.getProject(projectId ,function(err, project) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(project);
  });

};

exports.deleteProject = function(request, response) {

   var  projectId = request.params.projectId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Project.deleteProject(projectId ,function(err, output) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(null);
  });

};

exports.searchProjects = function(request, response) {

    var searchString = request.query.q
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Project.searchProjects(searchString ,function(err, projects) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(projects);
  });

};

exports.saveProjectTracking = function(request, response) {

   var projectId = request.params.projectId;

  Project.saveProjectTracking(request.body, projectId, function(err, savedProjectPhase) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (err) {
      response.send(err);
      return;
    }

    response.send(savedProjectPhase);
  });

};

exports.updateProjectTracking = function(request, response) {

   var projectId = request.params.projectId;
   var phaseId = request.params.trackingId;

  Project.updateProjectTracking(request.body, projectId, phaseId , function(err, savedProjectPhase) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (err) {
      response.send(err);
      return;
    }

    response.send(savedProjectPhase);
  });

};


exports.getProjectPhase = function(request, response) {

   var projectId = request.params.projectId;
   var phaseId = request.params.phaseId;

  Project.getProjectPhase(projectId, phaseId , function(err, projectPhase) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (err) {
      response.send(err);
      return;
    }

    response.send(projectPhase);
  });

};

exports.getProjectTracking = function(request, response) {

  var projectId = request.params.projectId;

  Project.getProjectTracking(projectId, function(err, projectPhases) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (err) {
      response.send(err);
      return;
    }

    response.send(projectPhases);
  });

};

exports.deleteProjectTracking = function(request, response) {

   var  trackingId = request.params.trackingId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Project.deleteProjectTracking(trackingId, function(err, output) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(null);
  });

};


exports.getStudentOfProject = function(request, response) {

   var projectId = request.params.projectId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Project.getStudentOfProject(projectId ,function(err, student) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(student);
  });

};


exports.getSupervisorsOfProject = function(request, response) {

   var projectId = request.params.projectId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Project.getSupervisorsOfProject(projectId ,function(err, supervisors) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(supervisors);
  });

};

exports.getPendingPhasesOfProject = function(request, response) {

   var projectId = request.params.projectId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Project.getPendingPhasesOfProject(projectId ,function(err, student) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(student);
  });

};