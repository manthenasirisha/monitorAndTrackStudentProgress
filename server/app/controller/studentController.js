var Student = require('../model/student');

exports.saveStudent = function(request, response) {

  Student.saveStudent(request.body, function(err, savedStudent) {
    console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if (err) {
      response.send(err);
      return;
    }

    response.send(savedStudent);
  });

};


exports.updateStudent = function(request, response) {

  Student.updateStudent(request.body, function(err, savedStudent) {
   console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   response.header('Access-Control-Allow-Methods: PUT');


    if (err) {
      response.send(err);
      return;
    }

    response.send(savedStudent);
  });

};

exports.getAllStudents = function(request, response) {

  Student.getAllStudents(function(err, students) {
    console.log('controller')
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if (err) {
      response.send(err);
    }

    response.send(students);
  });

};


exports.getStudent = function(request, response) {

    //var studentId = request.query.studentId
   var studentId = request.params.studentId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Student.getStudent(studentId ,function(err, student) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(student);
  });

};


exports.deleteStudent = function(request, response) {

    //var studentId = request.query.studentId
   var studentId = request.params.studentId;
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
``
  Student.deleteStudent(studentId ,function(err, output) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(null);
  });

};


exports.searchStudent = function(request, response) {

    var searchString = request.query.q
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Student.searchStudent(searchString ,function(err, students) {

    if (err) {
      response.send(err);
      return;
    }

    response.send(students);
  });

};