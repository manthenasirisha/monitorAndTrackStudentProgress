var dbConnection = require('./databaseConnection');

var Supervisor = function(supervisor) {
    this.id = supervisor.id;
    this.name = supervisor.name;
};

Supervisor.saveSupervisor = function insertSupervisor(supervisor, callback) {

  var values = [supervisor.name, supervisor.identificationNumber];

  dbConnection.query (
    "INSERT INTO supervisor(name, identification_number) VALUES (?, ?)",
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: result.insertId,
                name: supervisor.name,
                identificationNumber: supervisor.identificationNumber,
            };
            callback(null, responsePayload);
        }
     }
  );
}

Supervisor.updateSupervisor = function updateSupervisor(supervisor, callback) {

  var values = [supervisor.name, supervisor.identificationNumber];
  console.log(values);

  dbConnection.query (
    "UPDATE supervisor set name = ?, identification_number = ? where id = " + supervisor.id,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: supervisor.id,
                name: supervisor.name,
                identificationNumber: supervisor.identificationNumber,
            };
            callback(null, responsePayload);
        }
     }
  );
}

Supervisor.searchSupervisors = function findSupervisors(searchString, callback) {

  dbConnection.query (
    "SELECT s.id, s.name, s.identification_number FROM  supervisor s  WHERE s.name like '%" + searchString + "%'",
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var supervisorArray = [];
            result.forEach(function(item) {
                supervisorArray.push( {
                    id : item.id,
                    name : item.name,
                    identificationNumber : item.identification_number,
                 });
            });

            callback(null, { supervisors: supervisorArray } );
        }
     }
  );
}

Supervisor.getSupervisor = function getSupervisor(supervisorId, callback) {

  console.log("supervisorId", supervisorId);

  var query = "SELECT id, name, identification_number FROM supervisor WHERE id = " + supervisorId;

  dbConnection.query (query,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            console.log("result", result);
            var returnVal = {};
            if(result.length > 0) {
                returnVal = {
                    id : result[0].id,
                    name : result[0].name,
                    identificationNumber : result[0].identification_number,
                };
            }

            callback(null, returnVal);
        }
     }
  );
}

Supervisor.deleteSupervisor = function deleteSupervisor(supervisorId, callback) {

  console.log("supervisorId", supervisorId);

  var query = "DELETE FROM supervisor WHERE id = " + supervisorId;

  dbConnection.query (query,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            console.log("result", result);
            callback(null, null);
        }
     }
  );
}

Supervisor.supervisorProjects = function supervisorProjects(supervisorId, callback) {

  var values = [supervisorId];
var projectsQuery = "select p.id, p.name, p.description from supervisor_project sp, project p where p.id = sp.project_id and sp.supervisor_id = ?";

  dbConnection.query (
    projectsQuery,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
          var projectsArray = [];
          result.forEach(function(item) {
              projectsArray.push( {
                  id : item.id,
                  name : item.name,
                  description : item.description
               });
          });

           callback(null, { supervisorId: supervisorId,projects: projectsArray } );
        }
     }
  );
}

Supervisor.assignProject = function assignProject(supervisorId, projectId, callback) {

  var values = [supervisorId, projectId];
  var assignProjectQuery = "INSERT INTO supervisor_project(supervisor_id, project_id) VALUES (?, ?)";

  dbConnection.query (
    assignProjectQuery,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            console.log("result", result);
            callback(null, null);
        }
     }
  );
}

Supervisor.unAssignProject = function unAssignProject(supervisorId, projectId, callback) {

  var values = [supervisorId, projectId];
  var unAssignProjectQuery = "DELETE FROM supervisor_project WHERE supervisor_id = ? AND project_id =  ?";

  dbConnection.query (
    unAssignProjectQuery,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            console.log("result", result);
            callback(null, null);
        }
     }
  );
}


module.exports = Supervisor;



