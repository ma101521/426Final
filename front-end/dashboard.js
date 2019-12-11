//import './demo.js';
$(function(){

    $('#deleteProfile').click(deleteProfile);
    $('#logout').click(logout);
    let jwt = localStorage.getItem('jwt');
    getUser();

    function logout(event){
        window.location.href = "index.html";
    }

    function deleteProfile(event){
        event.preventDefault();
        console.log('delete');
        axios.get('http://localhost:3000/patient/user',
        {
            headers: {
              //jwt is the jwt from logging in
              "Authorization": "Bearer " + jwt
            },
        })
        .then(response => {
            let user = response.data.username;
            axios.delete('http://localhost:3000/patient/'+user)
            .then(response=> {
                console.log(response)
                axios.delete('http://localhost:3000/account/'+user)
                .then(response=> {
                    console.log(response)
                    window.location.href = "index.html";
                })
                .catch(error => console.log(error.response))
            })
            .catch(error => console.log(error.response))
        })
        .catch(error => console.log(error));
    }
    function getUser(event) {
        //event.preventDefault();
        axios.get('http://localhost:3000/patient/user',
        {
            headers: {
              //jwt is the jwt from logging in
              "Authorization": "Bearer " + jwt
            },
        })
        .then(response => {
            let user = response.data.data;
            axios.get('http://localhost:3000/provider/all',
            {
            headers: {
                //jwt is the jwt from logging in
                "Authorization": "Bearer " + jwt
            }})
            .then(response => {
                //console.log(user);
                let providers = response.data.data;
                //console.log(providers)
                let providerNames = Object.keys(providers);
                let matches = [];
                providerNames.forEach(provider => {
                    let match ={
                        'name': providers[provider].drName,
                        'phone': providers[provider].phone,
                        'address': providers[provider].address,
                        'matchPercentage': getMatch(user, providers[provider])
                    }
                    matches.push(match);
                   })
                matches = matches.sort(function(a, b){
                    if (a.matchPercentage < b.matchPercentage){
                        return 1;
                    }
                    else if (a.matchPercentage > b.matchPercentage){
                        return -1;
                    }
                    else{
                        return 0;
                    }
                });
                matches.forEach(match => {
                    createRowBox(match);
                })
            })
            .catch(error => console.log(error.response))
            })
            .catch(error => console.log(error.reponse))
    }

    function createRowBox(match){
        //console.log(match)
        let tableContent = $("#tableContent");
        let nameId = match.name.replace(/\s/g, '').replace('.','');
        tableContent.append(`
            <div class="box rowBox ${match.name}">
                <div class="columns">
                    <div class="column">
                        <p class="contactName">
                            <span class="provName">${match.name}</span><br>
                            ${match.address.number} ${match.address.street} ${match.address.zip} <br>
                            ${match.phone}
                        </p>
                    </div>
                    <div class="column has-text-centered">
                        <p class="contactMatch">${match.matchPercentage}%</p>
                    </div>
                    <div class="column has-text-centered">
                        <div style="width: 340px; height: 200px" id="${nameId}">
                        </div>
                    </div>
                </div>
            </div>
        
        `)
        getMap(match.address.number, match.address.street, match.address.zip, nameId)
    }

    /*+++++++++++++++POINT VALUES++++++++++++++++++
                    q1 : 1
                    q2 : 1
                    q3 : 6
                    q4 : 1
                    q5 : 1
                    q6 : 1
                    q7 : 1
                    q8 : 1
                    q9 : 1
                    q10: 3
                    q11: 3
    */

    //Match percentages will be based on the scoring table 
    /*Each MC question will have a percentage value associated with its importance along with a percentage 
    value for each associated question
        - answers are also given a score for thier relationship to the matched answer 
        -  Close answers are given .5 of the total point value, further answers can be given 0
            all others are given 0
    */

    //getMatch(patient, providers);
    function getMatch(patient, provider){
        //console.log(patient);
        //console.log(provider);
        let pointTotal = 0;


        /*MC:
        score values will be stored based on their relationship to the corect answer
        if (patient answers = provider answers + 1 * pointvalue for that question)
        else(Check to see if your answer is within range of getting points) { credit ginven * point value for that quesiton}*/


        if(patient.q1 == provider.q1){
            pointTotal ++;
        }

        if(patient.q4 == provider.q4){
            pointTotal ++;
        }
        else if(patient.q4 == (provider.q4 -1) || patient.q4 == (provider.q4 +1)){
            pointTotal = pointTotal + 0.5;
        }

        
        if(patient.q5 == provider.q5){
            pointTotal ++;
        }
        else if(patient.q5 == (provider.q5 -1) || patient.q5 == (provider.q5 +1)){
            pointTotal = pointTotal + 0.5;
        }
        

        if(patient.q6 == provider.q6){
            pointTotal ++;
        }
        else if(patient.q6 == (provider.q6 -1) || patient.q6 == (provider.q6 +1)){
            pointTotal = pointTotal + 0.5;
        }

        if(patient.q7 == provider.q7){
            pointTotal ++;
        }
        else if(patient.q7 == (provider.q7 -1) || patient.q7 == (provider.q7 +1)){
            pointTotal = pointTotal + 0.5;
        }

        if(patient.q8 == provider.q8){
            pointTotal ++;
        }
        else if(patient.q8 == (provider.q8 -1) || patient.q8 == (provider.q8 +1)){
            pointTotal = pointTotal + 0.5;
        }

    

        //Slider will check how close the value is to the health provider's and multiply that by the point value awarded for that question
            // Difference between the numbers 
            // If possitve subtract if negative add 
            // x = 10 - (or + if negative) difference
            // x * (question value)/10 = points awarded 

        let sliderOneDiff = (patient.q9 - provider.q9);
        if(sliderOneDiff < 0){sliderOneDiff = (sliderOneDiff * -1)}
        let x = 10 - sliderOneDiff;
        let pointsOneAwarded = (x * 1)/10;
        pointTotal = pointTotal + pointsOneAwarded;
        

        let sliderTwoDiff = (patient.q10 - provider.q10);
        if(sliderTwoDiff < 0){sliderTwoDiff = (sliderTwoDiff * -1)}
        let y = 10 - sliderTwoDiff;
        let pointsTwoAwarded = (y * 3)/10;
        pointTotal = pointTotal + pointsTwoAwarded;
        

        let sliderThreeDiff = (patient.q11 - provider.q11);
        if(sliderThreeDiff < 0){sliderThreeDiff = (sliderThreeDiff * -1)}
        let z = 10 - sliderThreeDiff;
        let pointsThreeAwarded = (z * 3)/10;
        pointTotal = pointTotal + pointsThreeAwarded;

        

        //Check Boxes 
        let q2Count = 0;
        patient.q2['checked'].forEach(checkedVal =>{
            if (provider.q2['checked'].includes(checkedVal)){
                q2Count++;
            }
        })
        patient.q2['unchecked'].forEach(uncheckVal =>{
            if(provider.q2['unchecked'].includes(uncheckVal)){
                q2Count++;
            }
        })
        q2Points = (q2Count)/13;
        pointTotal = pointTotal + q2Points;


        let q3Count = 0;
        patient.q3['checked'].forEach(checkedVal =>{
            if (provider.q3['checked'].includes(checkedVal)){
                q3Count++;
            }
        })
        patient.q3['unchecked'].forEach(uncheckVal =>{
            if(provider.q3['unchecked'].includes(uncheckVal)){
                q3Count++;
            }
        })
        q3Points = ((q3Count)/12)*6;
        pointTotal = pointTotal + q3Points;


        let score = pointTotal/20;
        let matchPercentage = score *100; 
        matchPercentage = Math.round(matchPercentage * 100) / 100
        return matchPercentage;
    }

    //put code here to load the dashboard in order of their match score

    //list of provider names since all the names have the class "provName"
    
    let search = $("#searchBar");
    search.on("input", debounce(function(){
        let providers = $(".provName").map(function(){
            return this.innerHTML;
        }).get();
        autocomplete(search, providers)}, 100)
    );    
})


function autocomplete(input, array){
    let result;
    //input.on("input", function(event){
        result = [];
        $(".resultsDiv").empty();
        let value = input.val();
        if (value != ""){
            for (let i = 0; i < array.length; i++){
                if (array[i].toLowerCase().includes(value.toLowerCase())){
                    result.push(array[i]);
                }
            }
        }
        for (let j = 0; j < result.length; j++){
            $(".resultsDiv").append(
                `
                <a class="list-item searchOption" id="${result[j]}">
                    ${result[j]}
                </a>
                `
            )
            $(".searchOption").on('click', function(event){
                event.stopImmediatePropagation();
                let str = event.target.id;
                let element = document.getElementsByClassName("rowBox " + str);
                element = element[0];
                element.scrollIntoView(true);
            })
        }
    //})
}

/*
    Debouncing function, pulled code from
    https://www.geeksforgeeks.org/debouncing-in-javascript/
    https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
    to create
*/

function debounce(func, wait, immediate){
    let timeout;
    return function(){
        let context = this;
        let args = arguments;
        let later = function(){
            timeout = null;
            if (!immediate){
                func.apply(context, args);
            }
        }

        let callNow = immediate && !timeout;
        clearTimeout(timeout);

        timeOut = setTimeout(later, wait);
        if (callNow){
            func.apply(context, args);
        }
    }
}


//a function that, when given a street address and div ID, will produce a map
//giving directions from chapel hill to that address
function getMap(houseNum, streetName, zipCode, mapID) {

    //initialize communication with the platform
    var platform = new H.service.Platform({
      apikey: 'l1Lu-8FedQeEX8DEyatsDvHtips48kEmWgPt9OL0Rrs'
    });
    var defaultLayers = platform.createDefaultLayers();
  
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
        //aleralert('Can\'t reach the remote server');
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
          //alert(error.message);
        });
      }
      
    }




    // Test calling the map function
    //getMap('112', 'battle lane', '27514', 'mappy');
    //getMap('409','swann trl', '27527', 'mapContainer');
  
  
  
    
    





