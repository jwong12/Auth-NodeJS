$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();

        var courseInfo = JSON.stringify({
            courseNo: $('#courseNo').val(),
            title: $('#title').val(),
            description: $('#description').val()
        });

        $.ajax({
            url: '/api/courses',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: courseInfo,
            success: function (json, status, request) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the course');
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the course');
                console.log('Request failed : ', status);
            }
        });

    });
});