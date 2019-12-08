/**
 * 
 * A full list of available request parameters can be found in the Geocoder API documentation.
 * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-geocode.html
 *
 *@param   {H.service.Platform} platform    A stub class to access HERE services
 */


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
    
      // Add the locations group to the map
      map.addObject(group);







      var stString = 'geo!35.913,-79.056'
      var endString ='geo!' + position.lat + ',' + position.lng

      var routingParameters = {
      // The routing mode:
      'mode': 'fastest;car',
      // The start point of the route:
      'waypoint0': stString,
      // The end point of the route:
      'waypoint1': endString,
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display'
    };
  
    // Define a callback function to process the routing response:
    var onResult = function(result) {
      var route,
        routeShape,
        startPoint,
        endPoint,
        linestring;
      if(result.response.route) {
      // Pick the first route from the response:
      route = result.response.route[0];
      // Pick the route's shape:
      routeShape = route.shape;
    
      // Create a linestring to use as a point source for the route line
      linestring = new H.geo.LineString();
    
      // Push all the points in the shape into the linestring:
      routeShape.forEach(function(point) {
        var parts = point.split(',');
        linestring.pushLatLngAlt(parts[0], parts[1]);
      });
    
      // Retrieve the mapped positions of the requested waypoints:
      startPoint = route.waypoint[0].mappedPosition;
      endPoint = route.waypoint[1].mappedPosition;
    
      // Create an outline for the route polyline:
      var routeOutline = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 10,
          strokeColor: 'rgba(0, 128, 255, 0.7)',
          lineTailCap: 'arrow-tail',
          lineHeadCap: 'arrow-head'
        }
      });
      // Create a patterned polyline:
      var routeArrows = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 10,
          fillColor: 'white',
          strokeColor: 'rgba(255, 255, 255, 1)',
          lineDash: [0, 2],
          lineTailCap: 'arrow-tail',
          lineHeadCap: 'arrow-head' }
        }
      );
      // create a group that represents the route line and contains
      // outline and the pattern
      var routeLine = new H.map.Group();
      routeLine.addObjects([routeOutline, routeArrows]);
    
      // Create a marker for the start point:
      var startMarker = new H.map.Marker({
        lat: startPoint.latitude,
        lng: startPoint.longitude,
        label: "Chapel Hill"
      });
    
      // Create a marker for the end point:
      var endMarker = new H.map.Marker({
        lat: endPoint.latitude,
        lng: endPoint.longitude
      });
    

      group.addEventListener('tap', function (evt) {
        map.setCenter(evt.target.getGeometry());
        openBubble(
          evt.target.getGeometry(), evt.target.label);
      }, false);
      // Add the route polyline and the two markers to the map:
      map.addObjects([routeLine, startMarker, endMarker]);
    
      // Set the map's viewport to make the whole route visible:
      map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
      }
    };
    
    // Get an instance of the routing service:
    var router = platform.getRoutingService();
    
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
      function(error) {
        alert(error.message);
      });







      // resizes the map so that all markers are in the map window
      map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
      });
    }
    
    
  }
  // Test calling the map function
  getMap('201', 's columbia', '27514', 'mappy');
  getMap('409','swann trl', '27527', 'mapContainer');



  
  