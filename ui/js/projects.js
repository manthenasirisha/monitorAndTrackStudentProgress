// when the project search form model is hidden submit the
// search form so that the projects.html data is refreshed
$('#projectModal').on('hidden.bs.modal', function (event) {
    $("#searchProjectForm").submit();
});

/**
 - handler for the myModal when it is being shown
 - since same modal is used for edit and add project
   this handler handles both edit and add project flows
*/
$("#projectModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);
  var projectId = relatedTarget.data('project-id');
  var action = relatedTarget.data('action');


  $("#projectAddEditForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

  // if the model is shown for the edit case then make a get call to
  // get the existing project details and populate the form with
  // the existing project details

   if(action === 'edit') {
        var getProjectUrl = "http://localhost:3000/project/" + projectId;
        $.get( getProjectUrl, function(projectData) {
            $('#projectId').val(projectData.id);
            $('#projectName').val(projectData.name);
            $('#projectDescription').val(projectData.description);
        });
    }
});

// function to delete a project
function deleteProject(projectId) {
    if (confirm("Are you sure you want to delete the project?")) {

      var deleteProjectUrl = "http://localhost:3000/project/" + projectId;

        $.ajax({
            url: deleteProjectUrl,
            method: 'POST',
            // on success of the project deletion submit the search form so that the main
            // page gets refreshed with the latest data
            success: function(result) {
                $("#searchProjectForm").submit();
                // show success message
             },
            data:{} // submitted with empty payload as the projectId is passed as path param
        });

    }
    return false;
}


// Attach a submit handler to the form
$("#projectAddEditForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

    // Get form values from the page:
  var $form = $( this ),
    projectId = $form.find( "input[name='projectId']" ).val(),
    projectName = $form.find( "input[name='projectName']" ).val(),
    projectDescription = $form.find( "textarea[name='projectDescription']" ).val(),
    saveUrl = "http://localhost:3000/project",
    editUrl = "http://localhost:3000/project/" + projectId;

  var posting;
    // handle the add project case
  if(projectId == null || projectId === "") {
        posting = $.post( saveUrl, { name: projectName, description: projectDescription  } );
          // Put the results in a div
        posting.done(function( data ) {
            $("input[name='projectId']" ).val(data.id);
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Project saved successfully" );
        });
  } else { // handle the edit project from
     $.ajax({
        url: editUrl,
        method: 'PUT',
        xhrFields: {
          withCredentials: false
        },
        success: function() {
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Project saved successfully" );
        },
        data: { "id": projectId, "name": projectName, "description": projectDescription }
      });
  }

});

// Attach a submit handler to the search project form
$("#searchProjectForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get the search text from the searchProjectForm:
  var $form = $( this ),
    projectSearchText = $form.find( "input[name='projectSearchText']" ).val(),
    url = "http://localhost:3000/project?q=" + projectSearchText;

  // Send the data using post
  var getting = $.get( url );

    // populate the projects table using the response data
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  projectRows = $('#projectsBody');
      projectRows.empty();

        $(function() {
            $.each(data.projects, function(i, item) {
                // populate each project data in a row
                var $tr = $('<tr>').append(
                    $('<th>').text(item.id),
                    $('<td>').append($('<a>')
                         .attr('href', 'project.html?projectId=' + item.id)
                         .text(item.name)
                        ),
                    $('<td>').text(item.description),
                    $('<td>').append($('<button>')
                         .attr('class','btn btn-primary btn-sm')
                         .attr('data-toggle', 'modal')
                         .attr('data-target', '#projectModal')
                         .attr('data-project-id', item.id)
                         .attr('data-action', 'edit')
                         .text('Edit Project')
                       ),
                   $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-project-id', item.id)
                       .attr('data-action', 'delete')
                       .text('Delete Project')
                       .click(function() {
                           deleteProject(item.id);
                       })
                     )
                ).appendTo('#projectsBody');

            });
        });

  });
});

// this makes the projects link of the menu bar to be active
(function() {
    $("#projectsLink").addClass("active");
        $("#searchProjectForm").submit();
})();
