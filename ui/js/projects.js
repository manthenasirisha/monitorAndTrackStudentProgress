       // data-* attributes to scan when populating modal values
var ATTRIBUTES = ['project-id','action'];

$('#projectModal').on('hidden.bs.modal', function (event) {
    $("#searchProjectForm").submit();
});

$("#projectModal").on('show.bs.modal', function (event) {
  var relatedTarget = $(event.relatedTarget);
  var projectId = relatedTarget.data('project-id');
  var action = relatedTarget.data('action');


  $("#projectAddEditForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();

   if(action === 'edit') {
        var getProjectUrl = "http://localhost:3000/project/" + projectId;
        $.get( getProjectUrl, function(projectData) {
            $('#projectId').val(projectData.id);
            $('#projectName').val(projectData.name);
            $('#projectDescription').val(projectData.description);
        });
    }
});


function deleteProject(projectId) {
    if (confirm("Are you sure you want to delete the project?")) {

      var deleteProjectUrl = "http://localhost:3000/project/" + projectId;

        $.ajax({
            url: deleteProjectUrl,
            method: 'POST',
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
$("#projectAddEditForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    projectId = $form.find( "input[name='projectId']" ).val(),
    projectName = $form.find( "input[name='projectName']" ).val(),
    projectDescription = $form.find( "textarea[name='projectDescription']" ).val(),
    saveUrl = "http://localhost:3000/project",
    editUrl = "http://localhost:3000/project/" + projectId;

  // Send the data using post
  var posting;
  if(projectId == null || projectId === "") {
        posting = $.post( saveUrl, { name: projectName, description: projectDescription  } );
          // Put the results in a div
        posting.done(function( data ) {
            $("input[name='projectId']" ).val(data.id);
            $( "#message" ).attr('class', 'alert alert-success').empty().append( "Project saved successfully" );
        });
  } else {
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

// Attach a submit handler to    the form
$("#searchProjectForm").submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    projectSearchText = $form.find( "input[name='projectSearchText']" ).val(),
    url = "http://localhost:3000/project?q=" + projectSearchText;

  // Send the data using post
  var getting = $.get( url );

  // get the results in a div
  getting.done(function( data ) {
    //reset the from and close

      // empty the rows and the append the rows
      var  projectRows = $('#projectsBody');
      projectRows.empty();

        $(function() {
            $.each(data.projects, function(i, item) {

                var $tr = $('<tr>').append(
                    $('<th>').attr('scope', 'row').text(i),
                    $('<td>').text(item.name),
                    $('<td>').text(item.description),
                    $('<td>').append($('<button>')
                         .attr('class','btn btn-warning btn-sm')
                         .attr('data-toggle', 'modal')
                         .attr('data-target', '#projectModal')
                         .attr('data-project-id', item.id)
                         .attr('data-action', 'edit')
                         .text('Edit')
                       ),
                   $('<td>').append($('<button>')
                       .attr('class','btn btn-danger btn-sm')
                       .attr('data-toggle', 'modal')
                       .attr('data-project-id', item.id)
                       .attr('data-action', 'delete')
                       .text('Delete')
                       .click(function() {
                           deleteProject(item.id);
                       })
                     )
                ).appendTo('#projectsBody');

            });
        });

  });
});
