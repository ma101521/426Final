
$(function() {

    $('#submitbutton').click(create);


    function create(event){
        event.preventDefault();
        console.log('hi');
        let type = $('input[name="I am a"]:checked').val();
        if(type == 'patient'){
            axios.post('http://localhost:3000/patient/create',
            {
            name: 'username',
            pass: 'password'
            })
            .then(response=> console.log(response))
            .catch(error=> console.log(error))
        }
        else{
            axios.post('http://localhost:3000/provider/create',
            {
            name: 'username',
            pass: 'password'
            })
            .then(response=> console.log(reponse))
            .catch(error=> console.log(error))
        }
    }
})