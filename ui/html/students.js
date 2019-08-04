       // data-* attributes to scan when populating modal values
var ATTRIBUTES = ['student-id','action'];

$('#myModal').on('hidden.bs.modal', function (event) {
    $("#searchStudentForm").submit();
});

$("#myModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);
  var studentId = relatedTarget.data('student-id');
  var action = relatedTarget.data('action');

  if(action != 'edit') {
      $("#studentAddEditForm").trigger("reset");
      $( "#message" ).removeClass();
      $( "#message" ).empty();
  }

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
      })

   if(action === 'edit') {
        var getStudentUrl = "http://localhost:3000/student/" + studentId;
        $.get( getStudentUrl, function(studentData) {
            $('#studentId').val(studentData.id);
            $('#studentName').val(studentData.name);
            $('#identificationNumber').val(studentData.identificationNumber);
            $('#batchId').val(studentData.batchId);
        });
    }
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
    saveUrl = "http://localhost:3000/student",
    editUrl = "http://localhost:3000/student/" + studentId;


  // Send the data using post
  var posting;
  if(studentId == null || studentId === "") {
        posting = $.post( saveUrl, { name: studentName, identificationNumber: identificationNumber, batchId: batchId  } );
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
        data: { "id": studentId, "name": studentName, "identificationNumber": identificationNumber, "batchId": batchId  }
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

                var $tr = $('<tr>').append(
                    $('<th>').attr('scope', 'row').text(i),
                    $('<td>').text(item.studentName),
                    $('<td>').text(item.programName),
                    $('<td>').text(item.batchStartDate),
                    $('<td>').append($('<button>')
                        .attr('class','btn btn-primary btn-sm')
                        .attr('data-toggle', '')
                        .attr('data-target', '')
                        .attr('data-student-id', item.studentId)
                        .attr('data-action', 'assign')
                        .text('Assign/Reassign')
                     ),
                    $('<td>').append($('<button>')
                         .attr('class','btn btn-warning btn-sm')
                         .attr('data-toggle', 'modal')
                         .attr('data-target', '#myModal')
                         .attr('data-student-id', item.studentId)
                         .attr('data-action', 'edit')
                         .text('Edit')
                       ),
                   $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-student-id', item.studentId)
                       .attr('data-action', 'delete')
                       .text('Delete')
                       .click(function() {
                           deleteItem(item.studentId);
                       })
                     )
                ).appendTo('#studentsBody');

            });
        });

  });
});
