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


  
    /**
     * This function will be called once the Geocoder REST API provides a response
     * @param  {Object} result          A JSONP object representing the  location(s) found.
     *
     * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-type-response-geocode.html
     */
    function onSuccess(result) {
      var locations = result.response.view[0].result;
      addLocationsToMap(locations);
    }
  
    /**
     * This function will be called if a communication error occurs during the JSON-P request
     * @param  {Object} error  The error message received.
     */
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
    
    // Hold a reference to any infobubble opened
    var bubble;
    
    /**
     * Opens/Closes a infobubble
     * @param  {H.geo.Point} position     The location on the map.
     * @param  {String} text              The contents of the infobubble.
     */

    
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
    
    /**
     * Creates a series of H.map.Markers for each location found, and adds it to the map.
     * @param {Object[]} locations An array of locations as received from the
     *                             H.service.GeocodingService
     */

    
    function addLocationsToMap(locations){
      var group = new  H.map.Group(),
        position,
        i;
    
      // Add geocoded location
      
      for (i = 0;  i < locations.length; i += 1) {
        
        position = {
          lat: locations[i].location.displayPosition.latitude,
          lng: locations[i].location.displayPosition.longitude
        };
        
        marker = new H.map.Marker(position);
        marker.label = locations[i].location.address.label;
        group.addObject(marker);
      }
    
      group.addEventListener('tap', function (evt) {
        map.setCenter(evt.target.getGeometry());
        openBubble(
          evt.target.getGeometry(), evt.target.label);
      }, false);
    
      //add Chapel Hill as starting marker
      centerMarker = new H.map.Marker({lat:35.913, lng:-79.056});
      centerMarker.label = "Chapel Hill";

      // Add the marker to the group (which causes it to be displayed on the map)
      group.addObject(centerMarker);

      // Add the locations group to the map
      map.addObject(group);
      map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
      });
    }
    
    
  }
  // Test calling the map function
  getMap('201', 's columbia', '27514', 'mappy');



  
  