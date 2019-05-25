var dbConnection = require('./databaseConnection');

var Student = function(student) {
    this.id = student.id;
    this.name = student.name;
    this.identificationNumber = student.identificationNumber;
    this.batchId = student.batchId;
};

Student.saveStudent = function insertStudent(student, callback) {

  var values = [student.name, student.identificationNumber , student.batchId];
  console.log(values);

  dbConnection.query (
    "INSERT INTO student(name, identification_number, batch_id) VALUES (?, ?, ?)",
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
                batchId: student.batchId
            };
            callback(null, responsePayload);
        }
     }
  );
}


Student.updateStudent = function updateStudent(student, callback) {

  var values = [student.name, student.identificationNumber , student.batchId];
  console.log(values);

  dbConnection.query (
    "UPDATE student set name = ?, identification_number = ?, batch_id = ? where id =" + student.id,
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
                batchId: student.batchId
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

  var query = "SELECT id, name, identification_number, batch_id FROM student WHERE id = " + studentId;

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
                    batchId : result[0].batch_id
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

module.exports = Student;



