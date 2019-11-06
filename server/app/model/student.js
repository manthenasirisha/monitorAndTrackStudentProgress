var dbConnection = require('./databaseConnection');

var Student = function(student) {
    this.id = student.id;
    this.name = student.name;
    this.identificationNumber = student.identificationNumber;
    this.batchId = student.batchId;
};

Student.saveStudent = function insertStudent(student, callback) {

  var values = [student.name, student.identificationNumber , student.batchId, student.projectId];
  console.log(values);

  dbConnection.query (
    "INSERT INTO student(name, identification_number, batch_id, project_id) VALUES (?, ?, ?, ?)",
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: result.insertId,
                name: student.name,
                identificationNumber: student.identificationNumber,
                batchId: student.batchId,
                projectId: student.projectId
            };
            callback(null, responsePayload);
        }
     }
  );
}


Student.updateStudent = function updateStudent(student, callback) {

  var values = [student.name, student.identificationNumber , student.batchId, student.projectId];
  console.log(values);

  dbConnection.query (
    "UPDATE student set name = ?, identification_number = ?, batch_id = ?, project_id = ? where id =" + student.id,
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var responsePayload = {
                id: student.id,
                name: student.name,
                identificationNumber: student.identificationNumber,
                batchId: student.batchId,
                projectId: student.projectId
            };
            callback(null, responsePayload);
        }
     }
  );
}

Student.getAllStudents = function getAllStudents(callback) {

  dbConnection.query (
    "SELECT * FROM student WHERE batch_id IN (SELECT b.id FROM batch b, program p WHERE b.program_id = p.id AND b.start_date > '2018-01-01')",
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var batchArray = [];
            result.forEach(function(item) {
                batchArray.push( {
                    name : item.name,
                    id : item.id,
                 });
            });

            callback(null, { students: batchArray } );
        }
     }
  );
}


Student.searchStudent = function findStudents(searchString, callback) {

  dbConnection.query (
    "SELECT s.id, s.name as sName, b.start_date, p.name as pName FROM student s, program p, batch b WHERE s.batch_id = b.id and b.start_date > '2018-01-01' and b.program_id = p.id and s.name like '%" + searchString + "%'",
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var batchArray = [];
            result.forEach(function(item) {
                batchArray.push( {
                    studentName : item.sName,
                    studentId : item.id,
                    batchStartDate : item.start_date,
                    programName : item.pName,
                 });
            });

            callback(null, { students: batchArray } );
        }
     }
  );
}



Student.getStudent = function getStudent(studentId, callback) {

  console.log("studentId", studentId);

  var query = "SELECT id, name, identification_number, batch_id, project_id FROM student WHERE id = " + studentId;

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
                    batchId : result[0].batch_id,
                    projectId: result[0].project_id
                };
            }

            callback(null, returnVal);
        }
     }
  );
}

Student.deleteStudent = function deleteStudent(studentId, callback) {

  console.log("studentId", studentId);

  var query = "DELETE FROM student WHERE id = " + studentId;

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

Student.getAllAssignableProjectsForAStudent = function getAllAssignableProjectsForAStudent(studentId, callback) {

  var values = [studentId];

  dbConnection.query (
    "select p.id, p.name, p.description from project p where p.id not in (select project_id from student where	project_id is not null) UNION select p.id,	p.name,	p.description from	project p where id in (select project_id from student where id = ?)",
    values,
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var assignableProjectsArray = [];
            result.forEach(function(item) {
                assignableProjectsArray.push( {
                    id : item.id,
                    name : item.name,
                    description : item.description,
                 });
            });

            callback(null, { assignableProjects: assignableProjectsArray } );
        }
     }
  );
}


Student.getSupervisorsOfStudent = function getSupervisorsOfStudent(studentId, callback) {

  var query = "select id, name, identification_number from supervisor where id in ( select sp.supervisor_id from supervisor_project sp, student s where sp.project_id = s.project_id and s.id = ?)";
  var values = [studentId];

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

module.exports = Student;



