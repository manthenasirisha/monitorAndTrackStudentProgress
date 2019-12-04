// when the student search form model is hidden submit the
// search form so that the students.html data is refreshed
$('#myModal').on('hidden.bs.modal', function (event) {
    $("#searchStudentForm").submit();
});

/**
 - handler for the myModal when it is being shown
 - since same modal is used for edit and add student
   this handler handles both edit and add student flows
*/
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

   // get call to get all the batches
  $.get( getAllBatchesUrl, function(batchData) {
     $.each(batchData.batches, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.programId).text(entry.programName));
      });

      // get all the assignable projects to the student
     var getAssignableProjectsUrl = "http://localhost:3000/student/" + studentId + "/assignableProjects";
     $.get( getAssignableProjectsUrl, function(assignableProjectsResponse) {
     $('#projectId').empty();
      $.each(assignableProjectsResponse.assignableProjects, function(index, item) {
              $('#projectId').append($('<option></option>').attr('value', item.id).text(item.name));
          });

      // if the model is shown for the edit case then make a get call to
      // get the existing student details and populate the form with
      // the existing student details
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

// function to delete a student
function deleteItem(studentId) {
    if (confirm("Are you sure you want to delete the student?")) {

      var deleteStudentUrl = "http://localhost:3000/student/" + studentId;

        $.ajax({
            url: deleteStudentUrl,
            method: 'POST',
            // on success of the student deletion submit the search form so that the main
            // page gets refreshed with the latest data
            success: function(result) {
                $("#searchStudentForm").submit();
                // show success message
             },
            data:{} // submitted with empty payload as the studentId is passed as path param
        });

    }
    return false;
}


// Attach a submit handler to the form
$("#studentAddEditForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get form values from the page:
  var $form = $( this ),
    studentId = $form.find( "input[name='studentId']" ).val(),
    studentName = $form.find( "input[name='studentName']" ).val(),
    identificationNumber = $form.find( "input[name='identificationNumber']" ).val(),
    batchId = $form.find( "select[name='batchId']" ).val(),
    projectId = $form.find( "select[name='projectId']" ).val(),
    saveUrl = "http://localhost:3000/student",
    editUrl = "http://localhost:3000/student/" + studentId;


  var posting;
  // handle the add student case
  if(studentId == null || studentId === "") {
        posting = $.post( saveUrl, { name: studentName, identificationNumber: identificationNumber, batchId: batchId, projectId: projectId  } );
          // Put the results in a div
        posting.done(function( data ) {
            $("input[name='studentId']" ).val(data.id);
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Student saved successfully" );
        });

  } else { // handle the edit student case
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

// Attach a submit handler to the search student form
$("#searchStudentForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get the search text from the searchStudentForm:
  var $form = $( this ),
    searchText = $form.find( "input[name='searchText']" ).val(),
    url = "http://localhost:3000/student?q=" + searchText;

  // Send the data using post
  var getting = $.get( url );

  // populate the students table using the response data
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  studentRows = $('#studentsBody');
      studentRows.empty();

        $(function() {
            $.each(data.students, function(i, item) {

                // populate each student data in a row
                $('<tr>').attr('class', 'table-active')
                    .append(
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

                // build a template for the project tracking phases
                var pId = item.projectId;
                $('<tr>').append(
                    $('<th>').text(''),
                    $('<td>').append($('<span>')
                                    .attr('class', 'badge badge-secondary')
                                    .attr('id', 'progressBar-1-' + pId)
                                    .text('Proposal-Ethical')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-2-' + pId)
                                     .text('Report Version 1')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-3-' + pId)
                                     .text('Report Version 2')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-5-' + pId)
                                     .text('Presentation')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-6-' + pId)
                                     .text('Poster')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-7-' + pId)
                                     .text('Draft Report')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-8-' + pId)
                                     .text('Final Report')),
                    $('<td>').append($('<span>')
                                     .attr('class', 'badge badge-secondary')
                                     .attr('id', 'progressBar-9-' + pId)
                                     .text('Internal & External Viva'))
                ).appendTo('#studentsBody');

                // get the project tracking and populate the tracking information using
                // the above template
                (function() {
                    var getProjectTrackingUrl = "http://localhost:3000/project/" + pId + "/tracking";
                    $.get( getProjectTrackingUrl, function(responseBody) {
                        $.each(responseBody.projectPhases, function(index, value){
                             $("#progressBar-"+ value.phaseId + "-" + pId).addClass("badge-success");
                        });
                    });
                })(pId);

            });
        });

  });
});

// this makes the students link of the menu bar to be active
(function() {
    $("#studentsLink").addClass("active");
    $("#searchStudentForm").submit();
})();
