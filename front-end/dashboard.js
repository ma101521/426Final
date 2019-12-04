$(function(){

    $('#getUser').click(getUser);
    $('#getProviders').click(getAllProviders);

    function getUser(event){
        event.preventDefault();
        console.log('work');
        let username = $('#username').val();
        axios.get('http://localhost:3000/patient/'+username,)
        .then(response=> console.log(response.data.data))
        .catch(error => console.log(error.response))
    }

    function getAllProviders(event) {
        event.preventDefault();
        console.log('hellooooo');
        //let username = $('#username').val();
        axios.get('http://localhost:3000/provider/all')
            .then(response => console.log(response.data))
            .catch(error => console.log(error.response))
    }
})