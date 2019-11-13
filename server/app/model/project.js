var dbConnection = require('./databaseConnection');

var Project = function(project) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
};

Project.saveProject = function insertProject(project, callback) {

  var values = [project.name, project.description];
  console.log(values);

  dbConnection.query (
    "INSERT INTO project(name, description) VALUES (?, ?)",
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: result.insertId,
                name: project.name,
                description: project.description,
            };
            callback(null, responsePayload);
        }
     }
  );
}

Project.updateProject = function updateProject(project, callback) {

  var values = [project.name, project.description];
  console.log(values);

  dbConnection.query (
    "UPDATE project set name = ?, description = ? where id = " + project.id,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: project.id,
                name: project.name,
                description: project.description,
            };
            callback(null, responsePayload);
        }
     }
  );
}

Project.searchProjects = function findProjects(searchString, callback) {

  dbConnection.query (
    "SELECT p.id, p.name, p.description FROM  project p  WHERE p.name like '%" + searchString + "%'",
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var projectArray = [];
            result.forEach(function(item) {
                projectArray.push( {
                    id : item.id,
                    name : item.name,
                    description : item.description,
                 });
            });

            callback(null, { projects: projectArray } );
        }
     }
  );
}

Project.getProject = function getProject(projectId, callback) {

  console.log("projectId", projectId);

  var query = "SELECT id, name, description FROM project WHERE id = " + projectId;

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
                    description : result[0].description,
                };
            }

            callback(null, returnVal);
        }
     }
  );
}

Project.deleteProject = function deleteProject(projectId, callback) {

  console.log("projectId", projectId);

  var query = "DELETE FROM project WHERE id = " + projectId;

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

Project.getProjectPhase = function getProjectPhase(projectId, phaseId, callback) {

  var query = "SELECT id, project_id, phase_id, notes, submission_date FROM project_tracking WHERE project_id = " + projectId + " and phase_id = " + phaseId ;

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
                    projectId : result[0].project_id,
                    phaseId : result[0].phase_id,
                    notes : result[0].notes,
                    marks : result[0].marks,
                    submissionDate : result[0].submission_date,
                };
            }

            callback(null, returnVal);
        }
     }
  );
}

Project.saveProjectTracking = function saveProjectTracking(projectPhase, projectId, callback) {

  var now = new Date();
  var values = [projectId, projectPhase.phaseId, projectPhase.notes, projectPhase.marks, now];
  console.log(values);

  dbConnection.query (
    "INSERT INTO project_tracking(project_id, phase_id, notes, marks,submission_date) VALUES (?, ?, ?, ?, ?)",
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: result.insertId,
                projectId: projectId,
                phaseId: projectPhase.phaseId,
                notes: projectPhase.notes,
                marks: projectPhase.marks,
                submissionDate: now
            };
            callback(null, responsePayload);
        }
     }
  );
}

Project.updateProjectTracking = function updateProjectTracking(projectPhase, projectId, projectTrackingId, callback) {

  var now = new Date();
  var values = [projectPhase.notes, projectPhase.marks, now];

  dbConnection.query (
    "update project_tracking set notes = ?, marks = ? , submission_date = ? where id = " + projectTrackingId ,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: projectTrackingId,
                projectId: projectId,
                phaseId: projectPhase.phaseId,
                notes: projectPhase.notes,
                marks: projectPhase.marks,
                submissionDate: now
            };
            callback(null, responsePayload);
        }
     }
  );
}

Project.deleteProjectTracking = function deleteProjectTracking(projectTrackingId, callback) {

    var query = "DELETE FROM project_tracking WHERE id = " + projectTrackingId;

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

Project.getProjectTracking = function getProjectTracking(projectId, callback) {

  var query = "SELECT pt.id, project_id, pt.notes, pt.marks, submission_date , phase_id, ph.name as phName, ph.description as phDesc FROM project_tracking pt, phase ph  WHERE ph.id = phase_id and project_id = " + projectId

  dbConnection.query (query,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        } else {
            var projectPhases = [];
            result.forEach(function(item) {
                projectPhases.push({
                  id : item.id,
                  projectId : item.project_id,
                  phaseId : item.phase_id,
                  notes : item.notes,
                  marks : item.marks,
                  submissionDate : item.submission_date,
                  phaseName: item.phName,
                  phaseDescription: item.phDesc
              });
            });

            callback(null, { projectPhases: projectPhases } );
        }
     }
  );
}


Project.getStudentOfProject = function getStudentOfProject(projectId, callback) {

  var query = "select s.id, s.name, s.batch_id, s.identification_number, s.project_id from student s, project p where p.id = ? and s.project_id = p.id";
  var values = [projectId];

  dbConnection.query (query,
  values,
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
                    batchId : result[0].batch_id,
                    identificationNumber : result[0].identification_number,
                    projectId: result[0].project_id
                };
            }

            callback(null, returnVal);
        }
     }
  );
}


Project.getSupervisorsOfProject = function getSupervisorsOfProject(projectId, callback) {

  var query = "select id, name, identification_number from supervisor where id in (select supervisor_id from supervisor_project  where project_id = ?)";
  var values = [projectId];

  dbConnection.query (query,
  values,
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

Project.getPendingPhasesOfProject = function getPendingPhasesOfProject(projectId, callback) {

  var query = "select id, name, description from phase where id not in (select phase_id from project_tracking where project_id = ?)";
  var values = [projectId];

  dbConnection.query (query,
  values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            console.log("result", result);
             var pendingPhases = [];
            if(result.length > 0) {
                result.forEach(function(item) {
                    pendingPhases.push({
                        id : item.id,
                        name : item.name,
                        description : item.description
                    });
                });
            }

            callback(null, { pendingPhases : pendingPhases });
        }
     }
  );
}

module.exports = Project;



