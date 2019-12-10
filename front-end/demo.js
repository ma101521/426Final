
//initialize communication with the platform
 var platform = new H.service.Platform({
  apikey: 'l1Lu-8FedQeEX8DEyatsDvHtips48kEmWgPt9OL0Rrs'
});
var defaultLayers = platform.createDefaultLayers();


//a function that, when given a street address and div ID, will produce a map
//giving directions from chapel hill to that address
function getMap(houseNum, streetName, zipCode, mapID) {
    var geocoder = platform.getGeocodingService(),
      geocodingParameters = {
        housenumber: houseNum,
        street: streetName,
        postalcode: zipCode,
        jsonattributes : 1
      };
  
    geocoder.geocode(
      geocodingParameters,
      onSuccess,
      onError
    );
  
    //This function will be called once the Geocoder REST API provides a response
    function onSuccess(result) {
      var locations = result.response.view[0].result;
      addLocationsToMap(locations);
    }
  
    //This function will be called if a communication error occurs during the JSON-P request
    function onError(error) {
      alert('Can\'t reach the remote server');
    }
  
    //Initialize map
    var map = new H.Map(
      document.getElementById(mapID),
      defaultLayers.vector.normal.map,
      {
        center: {lat:35.913, lng:-79.056},
        zoom: 13,
      });
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());
    
    
    //make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    
    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    //opens and closes an infobubble
    var bubble;
    function openBubble(position, text){
    if(!bubble){
        bubble =  new H.ui.InfoBubble(
          position,
          {content: text});
        ui.addBubble(bubble);
      } else {
        bubble.setPosition(position);
        bubble.setContent(text);
        bubble.open();
      }
    }
    
    //creates markers for each location found, and adds markers to map
    function addLocationsToMap(locations){
      var group = new  H.map.Group(),
        position,
        i;
    
      // Add geocoded location
      for (i = 0;  i < locations.length; i += 1) {
        position = {
          lat: locations[i].location.displayPosition.latitude,
          lng: locations[i].location.displayPosition.longitude,
          label: locations[i].location.address.label
        };
      }

      //getting coordinates for routing, start is chapel hill
      var stString = 'geo!35.913,-79.056'
      var endString ='geo!' + position.lat + ',' + position.lng

      var routingParameters = {
        mode: 'fastest;car',
        waypoint0: stString,
        waypoint1: endString,
        representation: 'display'
    };
  
    //callback function for routing response
    var onResult = function(result) {
      var route,
        routeShape,
        startPoint,
        endPoint,
        linestring;
      if(result.response.route) {
        route = result.response.route[0];
        routeShape = route.shape;
      
        // Create a linestring to use as a point source for the route line and add points
        linestring = new H.geo.LineString();
        routeShape.forEach(function(point) {
          var parts = point.split(',');
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });
      
        // Retrieve the mapped positions of the requested waypoints
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;
      
        //creating the route line, which to create a line with direction 
        //involves combining two separate route lines
        var routeOutline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 6,
            strokeColor: '#c51bd4',
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head'
          }
        });
        var routeArrows = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 6,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            lineDash: [0, 2],
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head' }
          }
        );
        var routeLine = new H.map.Group();
        routeLine.addObjects([routeOutline, routeArrows]);
      
        // Create a marker for the start and end points
        var startMarker = new H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude,
        });
        startMarker.addEventListener('tap', function (evt) {
          map.setCenter(evt.target.getGeometry());
          openBubble(
            evt.target.getGeometry(), "Chapel Hill\nYou are here!");
        }, false);

        var endMarker = new H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude,
        });
        endMarker.addEventListener('tap', function (evt) {
          map.setCenter(evt.target.getGeometry());
          openBubble(
            evt.target.getGeometry(), position.label);
        }, false);
        
        // Add the route and markers to the map
        map.addObjects([routeLine, startMarker, endMarker]);
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
      }
    };
    
    var router = platform.getRoutingService();
    router.calculateRoute(routingParameters, onResult,
      function(error) {
        alert(error.message);
      });
    }
    
  }
  // Test calling the map function
  //getMap('112', 'battle lane', '27514', 'mappy');
  //getMap('409','swann trl', '27527', 'mapContainer');



  
  