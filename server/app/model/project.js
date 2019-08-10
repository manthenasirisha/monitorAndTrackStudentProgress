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

module.exports = Project;



