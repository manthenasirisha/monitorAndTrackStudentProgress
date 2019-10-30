var supervisorId;
(function() {
    var parameters = new URL(window.location).searchParams;
    // set the value to a global variable
    supervisorId = parameters.get('supervisorId');
    $("#supervisorId").val(supervisorId);
})();

$('#assignProjectModal').on('hidden.bs.modal', function (event) {
    $("#searchProjectForm").submit();
});

$("#assignProjectModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);

  $("#assignProjectForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

   var getAssignableProjectsUrl = "http://localhost:3000/supervisor/"+ supervisorId + "/assignableProjects";
   $.get( getAssignableProjectsUrl, function(assignableProjectsResponse) {
   $('#projectId').empty();
    $.each(assignableProjectsResponse.assignableProjects,function(index, item) {
            $('#projectId').append("<option id='" +  item.id + "'>" + item.name + "</option>");
        });
   });

});


function unAssignProject(supervisorId, projectId) {
    if (confirm("Are you sure you want to un assign the project?")) {

      var unAssignProjectUrl = "http://localhost:3000/supervisor/" + supervisorId + "/un-assign-project/project/" + projectId;

        $.ajax({
            url: unAssignProjectUrl,
            method: 'PUT',
            success: function(result) {
                $("#searchProjectForm").submit();
                // show success message
             },
            data:{}
        });

    }
    return false;
}


// Attach a submit handler to the form
$("#assignProjectForm").submit(function( event ) {
  // Stop from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    projectId = $form.find("#projectId").children(":selected").attr("id"),
    assignUrl = "http://localhost:3000/supervisor/" + supervisorId + "/assign-project/project/" + projectId;
  // Send the data using post
     $.ajax({
        url: assignUrl,
        method: 'PUT',
        xhrFields: {
          withCredentials: false
        },
        success: function() {
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Project saved successfully" );
            // close the popup
        }
     });
});

// Attach a submit handler to    the form
$("#searchProjectForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    supervisorSearchText = $form.find( "input[name='projectSearchText']" ).val(),
    url = "http://localhost:3000/supervisor/" + supervisorId + "/projects?q=" + supervisorSearchText;

  // Send the data using post
  var getting = $.get( url );

  // get the results in a div
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  supervisorProjectsRows = $('#supervisorProjectsBody');
      supervisorProjectsRows.empty();

        $(function() {
            $.each(data.projects, function(i, item) {

                var $tr = $('<tr>').append(
                    $('<th>').text(item.id),
                    $('<td>').append($('<a>')
                         .attr('href', 'project.html?projectId=' + item.id)
                         .text(item.name)
                        ),
                   $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-project-id', item.id)
                       .attr('data-action', 'un-assign')
                       .text('Un assign')
                       .click(function() {
                           unAssignProject(supervisorId, item.id);
                       })
                     )
                ).appendTo('#supervisorProjectsBody');

            });
        });

  });
});


(function() {
    $("#searchProjectForm").submit();
       var getSupervisorUrl = "http://localhost:3000/supervisor/"+ supervisorId;
       $.get( getSupervisorUrl, function(supervisorResponse) {
           $("#supervisorName").html(supervisorResponse.name);
       });
})();