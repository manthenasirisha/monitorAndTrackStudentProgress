var Supervisor = require('../model/supervisor');

exports.saveSupervisor = function(request, response) {

  Supervisor.saveSupervisor(request.body, function(err, savedSupervisor) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if (err) {
      response.send(err);
      return;
    }

    response.send(savedSupervisor);
  });

};

exports.updateSupervisor = function(request, response) {

  Supervisor.updateSupervisor(request.body, function(err, savedSupervisor) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   response.header('Access-Control-Allow-Methods: PUT');


    if (err) {
      response.send(err);
      return;
    }

    response.send(savedSupervisor);
  });

};

exports.getAllSupervisors = function(request, response) {

  Supervisor.getAllSupervisors(function(err, supervisors) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if (err) {
      response.send(err);
    }

    response.send(supervisors);
  });

};

exports.getSupervisor = function(request, response) {

   var supervisorId = request.params.supervisorId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Supervisor.getSupervisor(supervisorId ,function(err, supervisor) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(supervisor);
  });

};

exports.deleteSupervisor = function(request, response) {

   var  supervisorId = request.params.supervisorId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Supervisor.deleteSupervisor(supervisorId ,function(err, output) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(null);
  });

};

exports.searchSupervisors = function(request, response) {

   var searchString = request.query.q
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Supervisor.searchSupervisors(searchString ,function(err, supervisors) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(supervisors);
  });

};

exports.supervisorProjects = function(request, response) {

    var supervisorId = request.params.supervisorId;
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Supervisor.supervisorProjects(supervisorId ,function(err, supervisorProjects) {

      if (err) {
        response.send(err);
        return;
      }

      response.send(supervisorProjects);
    });
};

exports.assignProject = function(request, response) {

    var supervisorId = request.params.supervisorId;
    var projectId = request.params.projectId;
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Supervisor.assignProject(supervisorId, projectId ,function(err, supervisorProjects) {

      if (err) {
        response.send(err);
        return;
      }

      response.send(supervisorProjects);
    });
};


exports.unAssignProject = function(request, response) {

    var supervisorId = request.params.supervisorId;
    var projectId = request.params.projectId;
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Supervisor.unAssignProject(supervisorId, projectId ,function(err, supervisorProjects) {

      if (err) {
        response.send(err);
        return;
      }

      response.send(supervisorProjects);
    });
};