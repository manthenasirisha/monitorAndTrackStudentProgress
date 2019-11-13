       // data-* attributes to scan when populating modal values
var ATTRIBUTES = ['student-id','action'];

$('#myModal').on('hidden.bs.modal', function (event) {
    $("#searchStudentForm").submit();
});

$("#myModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);
  var studentId = relatedTarget.data('student-id');
  var action = relatedTarget.data('action');

  $("#studentAddEditForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

  var getAllBatchesUrl = "http://localhost:3000/batch/all";

  var  dropdown = $('#batchId');
  dropdown.empty();
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose Batch';
  defaultOption.value = -1;
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  $.get( getAllBatchesUrl, function(batchData) {
     $.each(batchData.batches, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.programId).text(entry.programName));
      });

     var getAssignableProjectsUrl = "http://localhost:3000/student/" + studentId + "/assignableProjects";
     $.get( getAssignableProjectsUrl, function(assignableProjectsResponse) {
     $('#projectId').empty();
      $.each(assignableProjectsResponse.assignableProjects, function(index, item) {
              $('#projectId').append($('<option></option>').attr('value', item.id).text(item.name));
          });

     if(action === 'edit') {
          var getStudentUrl = "http://localhost:3000/student/" + studentId;
          $.get( getStudentUrl, function(studentData) {
              $('#studentId').val(studentData.id);
              $('#studentName').val(studentData.name);
              $('#identificationNumber').val(studentData.identificationNumber);
              $('#batchId').val(studentData.batchId);
              $('#projectId').val(studentData.projectId);
          });
      }
     });

  });

});


function deleteItem(studentId) {
    if (confirm("Are you sure you want to delete the student?")) {

      var deleteStudentUrl = "http://localhost:3000/student/" + studentId;

        $.ajax({
            url: deleteStudentUrl,
            method: 'POST',
            success: function(result) {
                $("#searchStudentForm").submit();
                // show success message
             },
            data:{}
        });

    }
    return false;
}


// Attach a submit handler to the form
$("#studentAddEditForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    studentId = $form.find( "input[name='studentId']" ).val(),
    studentName = $form.find( "input[name='studentName']" ).val(),
    identificationNumber = $form.find( "input[name='identificationNumber']" ).val(),
    batchId = $form.find( "select[name='batchId']" ).val(),
    projectId = $form.find( "select[name='projectId']" ).val(),
    saveUrl = "http://localhost:3000/student",
    editUrl = "http://localhost:3000/student/" + studentId;


  // Send the data using post
  var posting;
  if(studentId == null || studentId === "") {
        posting = $.post( saveUrl, { name: studentName, identificationNumber: identificationNumber, batchId: batchId, projectId: projectId  } );
          // Put the results in a div
        posting.done(function( data ) {
            $("input[name='studentId']" ).val(data.id);
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Student saved successfully" );
        });

  } else {
     $.ajax({
        url: editUrl,
        method: 'PUT',
        xhrFields: {
          withCredentials: false
        },
        success: function() {
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Student saved successfully" );
        },
        data: { "id": studentId, "name": studentName, "identificationNumber": identificationNumber, "batchId": batchId, "projectId": projectId }
      });
  }

});

// Attach a submit handler to    the form
$("#searchStudentForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    searchText = $form.find( "input[name='searchText']" ).val(),
    url = "http://localhost:3000/student?q=" + searchText;

  // Send the data using post
  var getting = $.get( url );

  // get the results in a div
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  studentRows = $('#studentsBody');
      studentRows.empty();

        $(function() {
            $.each(data.students, function(i, item) {

                $('<tr>').append(
                    $('<th>').text(item.studentId),
                    $('<td>').append($('<a>')
                            .attr('href', 'project.html?studentId=' + item.studentId)
                            .text(item.studentName)
                            ),
                    $('<td>').text(item.programName),
                    $('<td>').text(item.batchStartDate),
                    $('<td>').append($('<button>')
                         .attr('class','btn btn-primary btn-sm')
                         .attr('data-toggle', 'modal')
                         .attr('data-target', '#myModal')
                         .attr('data-student-id', item.studentId)
                         .attr('data-action', 'edit')
                         .text('Edit Student')
                       ),
                    $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-student-id', item.studentId)
                       .attr('data-action', 'delete')
                       .text('Delete Student')
                       .click(function() {
                           deleteItem(item.studentId);
                       })
                     ),
                     $('<td>').text(''),
                     $('<td>').text(''),
                     $('<td>').text('')
                ).appendTo('#studentsBody');

                var pId = item.projectId;
                $('<tr>').append(
                    $('<th>').text(''),
                    $('<td>').append($('<span>')
                                    .attr('class', 'label label-default')
                                    .attr('id', 'progressBar-1-' + pId)
                                    .text('Proposal-Ethical')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-2-' + pId)
                                     .text('Report Version 1')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-3-' + pId)
                                     .text('Report Version 2')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-5-' + pId)
                                     .text('Presentation')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-6-' + pId)
                                     .text('Poster')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-7-' + pId)
                                     .text('Draft Report')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-8-' + pId)
                                     .text('Final Report')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'label label-default')
                                     .attr('id', 'progressBar-9-' + pId)
                                     .text('Internal & External Viva'))
                ).appendTo('#studentsBody');

                (function() {
                    var getProjectTrackingUrl = "http://localhost:3000/project/" + pId + "/tracking";
                    $.get( getProjectTrackingUrl, function(responseBody) {
                        $.each(responseBody.projectPhases, function(index, value){
                             $("#progressBar-"+ value.phaseId + "-" + pId).addClass("btn-success");
                        });
                    });
                })(pId);

            });
        });

  });
});

(function() {
    $("#studentsLink").addClass("active");
    $("#searchStudentForm").submit();
})();
