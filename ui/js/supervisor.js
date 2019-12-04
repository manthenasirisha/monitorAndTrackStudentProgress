var supervisorId;
// get the supervisor id from the url params and put it in
// a hidden variable and as a global value
(function() {
    var parameters = new URL(window.location).searchParams;
    // set the value to a global variable
    supervisorId = parameters.get('supervisorId');
    $("#supervisorId").val(supervisorId);
})();

// when the supervisor search form model is hidden submit the
// search form so that the supervisor.html data is refreshed
// need to change the modal name and form name to be consistent with
// the supervisor entity
$('#assignProjectModal').on('hidden.bs.modal', function (event) {
    $("#searchProjectForm").submit();
});

//handler for the modal when it is being shown
$("#assignProjectModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);

  $("#assignProjectForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

    // get all the assignable projects of a supervisor
   var getAssignableProjectsUrl = "http://localhost:3000/supervisor/"+ supervisorId + "/assignableProjects";
   $.get( getAssignableProjectsUrl, function(assignableProjectsResponse) {
   $('#projectId').empty();
   // populate the assignable projects of a supervisor
    $.each(assignableProjectsResponse.assignableProjects,function(index, item) {
            $('#projectId').append("<option id='" +  item.id + "'>" + item.name + "</option>");
        });
   });

});

// function un-assigns a project assigned to the supervisor
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
// form name should match the actual supervisor entity
$("#assignProjectForm").submit(function( event ) {
  // Stop from submitting normally
  event.preventDefault();

  // assign project to a supervisor
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


  var $form = $( this ),
    supervisorSearchText = $form.find( "input[name='projectSearchText']" ).val(),
    url = "http://localhost:3000/supervisor/" + supervisorId + "/projects?q=" + supervisorSearchText;

  var getting = $.get( url );

  // get the filtered projects assigned to the given supervisor
  // and populate the table
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and then append the rows
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
    // submit the search form to get all the projects assigned to the supervisor
    $("#searchProjectForm").submit();

    // get the supervisor details
    var getSupervisorUrl = "http://localhost:3000/supervisor/"+ supervisorId;
    $.get( getSupervisorUrl, function(supervisorResponse) {
       $("#supervisorName").html(supervisorResponse.name);
    });
})();