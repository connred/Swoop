$(document).ready(function () {
    var socketServer = 'http://10.10.102.197:8080/' // IP FOR VM, MUST HAVE PORT 8080
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
	socket.on('echo', function(data) {
		console.log('socket eacho = ' + JSON.stringify(data));
		$('#dht-display').text(data.temp + "C, " + data.humi + "%");
		$('#range-display').text(data.range);
	});
});
/***************************
*****		 GeoLoc 
***************************/
/*
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
    mapholder.style.width = '700px';

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
*/
function swoopMap() {
	var mapProp= {
    	// center: new google.maps.LatLng(51.508742, -0.120850),
    	zoom: 16,
	};
	var map=new google.maps.Map(document.getElementById("mapSect"),mapProp);
	
	// Create an array of alphabetical characters used to label the markers.
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// Add some markers to the map.
	// Note: The code uses the JavaScript Array.prototype.map() method to
	// create an array of markers based on a given "locations" array.
	// The map() method here has nothing to do with the Google Maps API.
	var markers = locations.map(function (location, i) {
		return new google.maps.Marker({
			position: location,
			label: labels[i % labels.length]
		});
	});

	// Add a marker clusterer to manage the markers.
	var markerCluster = new MarkerClusterer(map, markers, {
		imagePath: 'assets/img/m'
	});
	var infoWindow = new google.maps.InfoWindow({map: map});
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			infoWindow.setPosition(pos);
			infoWindow.setContent('Location found.');
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

var locations = [
	{lat: -31.563910, lng: 147.154312},
	{lat: -33.718234, lng: 150.363181},
	{lat: -33.727111, lng: 150.371124},
	{lat: -33.848588, lng: 151.209834},
	{lat: -33.851702, lng: 151.216968},
	{lat: -34.671264, lng: 150.863657},
	{lat: -35.304724, lng: 148.662905},
	{lat: -36.817685, lng: 175.699196},
	{lat: -36.828611, lng: 175.790222},
	{lat: -37.750000, lng: 145.116667},
	{lat: -37.759859, lng: 145.128708},
	{lat: -37.765015, lng: 145.133858},
	{lat: -37.770104, lng: 145.143299},
	{lat: -37.773700, lng: 145.145187},
	{lat: -37.774785, lng: 145.137978},
	{lat: -37.819616, lng: 144.968119},
	{lat: -38.330766, lng: 144.695692},
	{lat: -39.927193, lng: 175.053218},
	{lat: -41.330162, lng: 174.865694},
	{lat: -42.734358, lng: 147.439506},
	{lat: -42.734358, lng: 147.501315},
	{lat: -42.735258, lng: 147.438000},
	{lat: -43.999792, lng: 170.463352}
]
