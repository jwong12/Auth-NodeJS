$(function ready() {

    $.getJSON("/api/courses", function (data) {
        data.forEach(function (item) {
            $('#courses').append('<tr><td>' + item.courseNo + '</td><td>' + item.title + '</td></tr>');
        });
    });

});