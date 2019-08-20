var dbConnection = require('./databaseConnection');

var Supervisor = function(supervisor) {
    this.id = supervisor.id;
    this.name = supervisor.name;
};

Supervisor.saveSupervisor = function insertSupervisor(supervisor, callback) {

  var values = [supervisor.name, supervisor.identificationNumber];
  console.log(values);

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

module.exports = Supervisor;



