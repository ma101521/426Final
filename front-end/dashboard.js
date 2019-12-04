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


    //getMatch(patient, providers);
    function getMatch(patient, provider){
        //console.log(patient);
        //console.log(provider);
        let score = 0;
        if(patient.q1 == provider.q1){
            score += 1;
        }
        return score;
    }
})