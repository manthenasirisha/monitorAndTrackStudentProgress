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