var projectId,studentId;
(function() {
    var parameters = new URL(window.location).searchParams;
    // set the value to a global variable
    projectId = parameters.get('projectId');
    studentId = parameters.get('studentId');
    $("#projectHiddenId").val(projectId);
    $("#studentHiddenId").val(studentId);
})();

$(document).ready(function() {
    // load the project if the project id is present
    if(projectId) {
        var getProjectUrl = "http://localhost:3000/project/" + projectId;
        $.get( getProjectUrl, function(projectData) {
            $('#projectId').html(projectData.id);
            $('#projectName').html(projectData.name);
            $('#projectDescription').html(projectData.description);
        });

        var getProjectPhasesUrl = "http://localhost:3000/project/" + projectId + "/phases";
        $.get( getProjectPhasesUrl, function(responseBody) {
            $.each(responseBody.projectPhases, function(index, value){
                 $("#progressBar-"+ value.phaseId).addClass("btn-success");
            });
        });

        var getStudentProjectUrl = "http://localhost:3000/project/" + projectId + "/student";
        $.get( getStudentProjectUrl, function(studentData) {
            $('#studentId').html(studentData.id);
            $('#studentName').html(studentData.name);
            $('#identificationNumber').html(studentData.identificationNumber);
        });

        var getSupervisorsUrlFromProjectIdUrl = "http://localhost:3000/project/" + projectId + "/supervisors";
        $.get( getSupervisorsUrlFromProjectIdUrl, function(responseBody) {
            $.each(responseBody.supervisors, function(index, supervisorData){
                $('#supervisorsUl').append("<li class='list-group-item'>"  + supervisorData.name + "</li>");
            });
        });

    } else if (studentId) {
        var getStudentUrl = "http://localhost:3000/student/" + studentId;
        $.get( getStudentUrl, function(studentData) {
            $('#studentId').html(studentData.id);
            $('#studentName').html(studentData.name);
            $('#identificationNumber').html(studentData.identificationNumber);

            if(studentData.projectId) {

                if(!projectId) {
                    projectId = studentData.projectId;
                }

                var getProjectUrl = "http://localhost:3000/project/" + studentData.projectId;
                $.get( getProjectUrl, function(projectData) {
                    $('#projectId').html(projectData.id);
                    $('#projectName').html(projectData.name);
                    $('#projectDescription').html(projectData.description);
                });

                var getProjectPhasesUrl = "http://localhost:3000/project/" + studentData.projectId + "/phases";
                $.get( getProjectPhasesUrl, function(responseBody) {
                    $.each(responseBody.projectPhases, function(index, value){
                         $("#progressBar-"+ value.phaseId).addClass("btn-success");
                    });
                });

                var getSupervisorsUrlFromStudentIdUrl = "http://localhost:3000/student/" + studentId + "/supervisors";
                $.get( getSupervisorsUrlFromStudentIdUrl, function(responseBody) {
                    $.each(responseBody.supervisors, function(index, supervisorData){
                        $('#supervisorsUl').append("<li class='list-group-item'>"  + supervisorData.name + "</li>");
                    });
                });
            }
        });
    }
});

$('#projectTrackingModal').on('hidden.bs.modal', function (event) {
    location.reload();
});

$("#projectTrackingModal").on('show.bs.modal', function (event) {
  $("#markProjectPhaseCompleteForm").trigger("reset");
  $( "#message" ).removeClass();
  $( "#message" ).empty();
  var relatedTarget = $(event.relatedTarget);
  var action = relatedTarget.data('action');
  var phaseId = relatedTarget.data('phase-id');
  var phaseName = relatedTarget.data('phase-name');
  $("#phaseId").val(phaseId);

   var getAllProjectPhasesUrl = "http://localhost:3000/project/" + projectId + "/phases";
   $.get( getAllProjectPhasesUrl, function(projectPhasesResponse) {

    $.each(projectPhasesResponse.projectPhases,function(index, item) {
        if (phaseId === item.phaseId) {
            $("#phaseId" ).prop( "checked", true );
            $("#phaseLabelId").html(phaseName);
            $("#notes").val(item.notes);
            $("#marks").val(item.marks);
        };
    });
   });

});


$("#markProjectPhaseCompleteForm").submit(function( event ) {
  // Stop from submitting normally
  event.preventDefault();


  // Get some values from elements on the page:
  var phaseIdChecked = $('#phaseId').is(':checked');
  var $form = $( this ),
    phaseId = $form.find("#phaseId").val(),
    markProjectPhaseCompleteUrl = "http://localhost:3000/project/" + projectId + "/phase/" + phaseId,
    deleteProjectPhaseCompleteUrl = "http://localhost:3000/project/" + projectId + "/phase/" + phaseId,
    notesObject = $form.find( "input[name='notes']");
    marksObject = $form.find( "input[name='marks']");

    if(phaseIdChecked) {
         $.ajax({
            url: markProjectPhaseCompleteUrl,
            method: 'POST',
            xhrFields: {
              withCredentials: false
            },
            success: function() {
                $( "#message" ).attr('class', 'alert alert-success').empty().append( "Phase saved successfully" );
                // close the popup
            },
            data: { "notes": notesObject.val() , "marks": marksObject.val() }
         });
     } else {
         $.ajax({
            url: deleteProjectPhaseCompleteUrl,
            method: 'PUT',
            xhrFields: {
              withCredentials: false
            },
            success: function() {
                $( "#message" ).attr('class', 'alert alert-success').empty().append( "Phase Deleted successfully" );
            }
         });
     }
});

