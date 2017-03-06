$(document).ready(function () {
    var socket = io.connect();
    socket.on('addcar1', function (data) {
        //$
    });
    socket.on('addcar2', function (data) {
        //$
    });
    socket.on('addcar3', function (data) {
        //$
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
            var latlon = position.coords.latitude + "," + position.coords.longitude;
            alert(latlon);
            console.log(latlon);
            //return latlon;
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }
});