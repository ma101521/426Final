$(function(){

    let jwt = localStorage.getItem('jwt');
    /* $('#getUser').click(getUser);
    $('#getProviders').click(getAllProviders); */
    getUser();
    getAllProviders();

    function getUser(event) {
        //event.preventDefault();
        axios.get('http://localhost:3000/patient/user',
        {
            headers: {
              //jwt is the jwt from logging in
              "Authorization": "Bearer " + jwt
            },
        })
        .then(response => console.log(response))
        .catch(error => console.log(error.reponse))
    }

    function getAllProviders(event) {
        event.preventDefault();
        //console.log('hellooooo');
        //let username = $('#username').val();
        axios.get('http://localhost:3000/provider/all',
        {
        headers: {
            //jwt is the jwt from logging in
            "Authorization": "Bearer " + jwt
        }})
            .then(response => console.log(response))
            .catch(error => console.log(error.response))
    }
})