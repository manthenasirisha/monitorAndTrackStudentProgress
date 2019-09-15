       // data-* attributes to scan when populating modal values
var ATTRIBUTES = ['project-id','action'];

$('#supervisorModal').on('hidden.bs.modal', function (event) {
    $("#searchSupervisorForm").submit();
});

$("#supervisorModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);
  var supervisorId = relatedTarget.data('supervisor-id');
  var action = relatedTarget.data('action');

  $("#supervisorAddEditForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

   if(action === 'edit') {
        var getSupervisorUrl = "http://localhost:3000/supervisor/" + supervisorId;
        $.get( getSupervisorUrl, function(supervisorData) {
            $('#supervisorId').val(supervisorData.id);
            $('#supervisorName').val(supervisorData.name);
            $('#supervisorIdentificationNumber').val(supervisorData.identificationNumber);
        });
    }
});


function deleteSupervisor(supervisorId) {
    if (confirm("Are you sure you want to delete the supervisor?")) {

      var deleteSupervisorUrl = "http://localhost:3000/supervisor/" + supervisorId;

        $.ajax({
            url: deleteSupervisorUrl,
            method: 'POST',
            success: function(result) {
                $("#searchSupervisorForm").submit();
                // show success message
             },
            data:{}
        });

    }
    return false;
}


// Attach a submit handler to the form
$("#supervisorAddEditForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    supervisorId = $form.find( "input[name='supervisorId']" ).val(),
    supervisorName = $form.find( "input[name='supervisorName']" ).val(),
    supervisorIdentificationNumber = $form.find( "input[name='supervisorIdentificationNumber']" ).val(),
    saveUrl = "http://localhost:3000/supervisor",
    editUrl = "http://localhost:3000/supervisor/" + supervisorId;

  // Send the data using post
  var posting;
  if(supervisorId == null || supervisorId === "") {
        posting = $.post( saveUrl, { name: supervisorName , identificationNumber: supervisorIdentificationNumber } );
          // Put the results in a div
        posting.done(function( data ) {
            $("input[name='supervisorId']" ).val(data.id);
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Supervisor saved successfully" );
        });
  } else {
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

// Attach a submit handler to    the form
$("#searchSupervisorForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    supervisorSearchText = $form.find( "input[name='supervisorSearchText']" ).val(),
    url = "http://localhost:3000/supervisor?q=" + supervisorSearchText;

  // Send the data using post
  var getting = $.get( url );

  // get the results in a div
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  supervisorRows = $('#supervisorsBody');
      supervisorRows.empty();

        $(function() {
            $.each(data.supervisors, function(i, item) {

                var $tr = $('<tr>').append(
                    $('<th>').text(item.id),
                    $('<td>').text(item.name),
                    $('<td>').text(item.identificationNumber),
                    $('<td>').append($('<button>')
                         .attr('class','btn btn-warning btn-sm')
                         .attr('data-toggle', 'modal')
                         .attr('data-target', '#supervisorModal')
                         .attr('data-supervisor-id', item.id)
                         .attr('data-action', 'edit')
                         .text('Edit')
                       ),
                   $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-supervisor-id', item.id)
                       .attr('data-action', 'delete')
                       .text('Delete')
                       .click(function() {
                           deleteSupervisor(item.id);
                       })
                     )
                ).appendTo('#supervisorsBody');

            });
        });

  });
});
