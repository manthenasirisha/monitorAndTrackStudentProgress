// when the supervisor search form model is hidden submit the
// search form so that the supervisors.html data is refreshed
$('#supervisorModal').on('hidden.bs.modal', function (event) {
    $("#searchSupervisorForm").submit();
});

/**
 - handler for the supervisorModal when it is being shown
 - since same modal is used for edit and add supervisor
   this handler handles both edit and add supervisor flows
*/
$("#supervisorModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);
  var supervisorId = relatedTarget.data('supervisor-id');
  var action = relatedTarget.data('action');

  $("#supervisorAddEditForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

      // if the model is shown for the edit case then make a get call to
      // get the existing supervisor details and populate the form with
      // the existing supervisor details
   if(action === 'edit') {
        var getSupervisorUrl = "http://localhost:3000/supervisor/" + supervisorId;
        $.get( getSupervisorUrl, function(supervisorData) {
            $('#supervisorId').val(supervisorData.id);
            $('#supervisorName').val(supervisorData.name);
            $('#supervisorIdentificationNumber').val(supervisorData.identificationNumber);
        });
    }
});

// function to delete a supervisor
function deleteSupervisor(supervisorId) {
    if (confirm("Are you sure you want to delete the supervisor?")) {

      var deleteSupervisorUrl = "http://localhost:3000/supervisor/" + supervisorId;

        $.ajax({
            url: deleteSupervisorUrl,
            method: 'POST',
            // on success of the supervisor deletion submit the search form so that the main
            // page gets refreshed with the latest data
            success: function(result) {
                $("#searchSupervisorForm").submit();
                // show success message
             },
            data:{} // submitted with empty payload as the supervisorId is passed as path param
        });

    }
    return false;
}


// Attach a submit handler to the form
$("#supervisorAddEditForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get form values
  var $form = $( this ),
    supervisorId = $form.find( "input[name='supervisorId']" ).val(),
    supervisorName = $form.find( "input[name='supervisorName']" ).val(),
    supervisorIdentificationNumber = $form.find( "input[name='supervisorIdentificationNumber']" ).val(),
    saveUrl = "http://localhost:3000/supervisor",
    editUrl = "http://localhost:3000/supervisor/" + supervisorId;

  var posting;
  // handle the add supervisor case
  if(supervisorId == null || supervisorId === "") {
        posting = $.post( saveUrl, { name: supervisorName , identificationNumber: supervisorIdentificationNumber } );
          // Put the results in a div
        posting.done(function( data ) {
            $("input[name='supervisorId']" ).val(data.id);
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Supervisor saved successfully" );
        });
  } else { // handle the edit supervisor case
     $.ajax({
        url: editUrl,
        method: 'PUT',
        xhrFields: {
          withCredentials: false
        },
        success: function() {
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Supervisor saved successfully" );
        },
        data: { "id": supervisorId, "name": supervisorName, identificationNumber: supervisorIdentificationNumber}
      });
  }

});

// Attach a submit handler to the search supervisor form
$("#searchSupervisorForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get the search text from the searchSupervisorForm:
  var $form = $( this ),
    supervisorSearchText = $form.find( "input[name='supervisorSearchText']" ).val(),
    url = "http://localhost:3000/supervisor?q=" + supervisorSearchText;

  // Send the data using post
  var getting = $.get( url );

    // populate the supervisors table using the response data
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  supervisorRows = $('#supervisorsBody');
      supervisorRows.empty();

        $(function() {
            $.each(data.supervisors, function(i, item) {

                // populate each supervisor data in a row
                var $tr = $('<tr>').append(
                    $('<th>').text(item.id),
                      $('<td>').append($('<a>')
                                   .attr('href', 'supervisor.html?supervisorId=' + item.id)
                                   .text(item.name)
                           ),
                    $('<td>').text(item.identificationNumber),
                    $('<td>').append($('<button>')
                         .attr('class','btn btn-primary btn-sm')
                         .attr('data-toggle', 'modal')
                         .attr('data-target', '#supervisorModal')
                         .attr('data-supervisor-id', item.id)
                         .attr('data-action', 'edit')
                         .text('Edit Supervisor')
                       ),
                   $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-supervisor-id', item.id)
                       .attr('data-action', 'delete')
                       .text('Delete Supervisor')
                       .click(function() {
                           deleteSupervisor(item.id);
                       })
                     )
                ).appendTo('#supervisorsBody');

            });
        });

  });
});

// this makes the supervisors link of the menu bar to be active
(function() {
    $("#supervisorsLink").addClass("active");
    $("#searchSupervisorForm").submit();
})();
