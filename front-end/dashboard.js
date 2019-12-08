$(function(){

    let jwt = localStorage.getItem('jwt');
    getUser();

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
                let providerNames = Object.keys(providers);
                let matchPair = [];
                providerNames.forEach(provider => {
                    matchPair.push(providers[provider].drName, providers[provider].phone, providers[provider].address, getMatch(user, providers[provider]))
                })
                console.log(matchPair);
            })
            .catch(error => console.log(error.response))
            })
            .catch(error => console.log(error.reponse))
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


        let score = pointTotal/20;
        return score;
    }

    //put code here to load the dashboard in order of their match score

    //list of provider names since all the names have the class "provName"
    let providers = $(".provName").map(function(){
        return this.innerHTML;
    }).get();
    let search = $("#searchBar");

    debounce(autocomplete(search, providers));
    
})

function autocomplete(input, array){
    let result;
    input.on("input", function(event){
        result = [];
        $(".resultsDiv").empty();
        let value = input.val();
        if (value != ""){
            for (let i = 0; i < array.length; i++){
                if (array[i].substr(0, value.length).toLowerCase() == value.toLowerCase()){
                    result.push(array[i]);
                }
            }
        }
        for (let j = 0; j < result.length; j++){
            $(".resultsDiv").append(
                `
                <a class="list-item">
                    ${result[j]}
                </a>
                `
            )
        }
        console.log(result);
    })
}

function debounce(func, wait){
    //create variable for timeout, will not hold a value to start
    let timeout;
    return function(...args){
        let context = this;
        //check if timeout has a value. if it doesn't, we can call the function now
        let callNow = !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    }
}