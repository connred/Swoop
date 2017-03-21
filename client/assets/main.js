$(document).ready(function () {
    var socketServer = 'http://10.10.103.160:8080/' // IP FOR VM, MUST HAVE PORT 8080
    var socket = io.connect(socketServer);
    socket.on('addcar1', function (data) {
        console.log(data);
        $('#car1').append('<p>' + 'Time:' + data.t + 'Alt:' + data.alt + 'Lat:' + data.lat + 'long:' + data.long + '<p>'); // change for real data
        //showCarLocation(data);
    });
    socket.on('addcar2', function (data) {
        //$
    });
    socket.on('addcar3', function (data) {
        //$
    });

});
/***************************
*****		 GeoLoc 
***************************/
var x = document.getElementById("userIssues");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('userMap')
    mapholder.style.height = '400px';
    mapholder.style.width = '500px';

    var myOptions = {
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    var map = new google.maps.Map(document.getElementById("userMap"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}
function showCarLocations(data){
    // will use this function to show real time updates of cars on map
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
function swoopMap() {
	var mapProp= {
    	center:new google.maps.LatLng(51.508742, -0.120850),
    	zoom:5,
	};
	var map=new google.maps.Map(document.getElementById("mapSect"),mapProp);
}
