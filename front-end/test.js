
$(function () {

    let jwt = localStorage.getItem('jwt');

    $('#submitbutton').click(create);
    $('#providerRadio').on("change", function () {
        $('#providerForm').show()
    })
    $('#patientRadio').on("change", function () {
        $('#providerForm').hide()
    })
    $('#getUser').click(getUser);
    $('#getProviders').click(getAllProviders);

    function getAllProviders(event) {
        event.preventDefault();
        console.log('hellooooo');
        //let username = $('#username').val();
        axios.get('http://localhost:3000/provider/all')
            .then(response => console.log(response))
            .catch(error => console.log(error.response))
    }

    function getUser(event) {
        event.preventDefault();
        //console.log('work');
        //let username = $('#username').val();
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

    function create(event) {
        event.preventDefault();
        //console.log('hi');
        let describeYou = [];
        $.each($('input[name="Which of the following statements describe you. Please check all that apply."]:checked'), function () {
            describeYou.push($(this).val());
        });
        let topics = [];
        $.each($('input[name="What topics are you interested in learning more about? Please check all that apply."]:checked'), function () {
            topics.push($(this).val());
        });
        let type = $('input[name="I am a"]:checked').val();
        if (type == 'patient') {
            axios({
                method: 'post',
                url: 'http://localhost:3000/patient/create',
                headers: {
                    //jwt is the jwt from logging in
                    "Authorization": "Bearer " + jwt
                },
                data:{
                    q1: $('input[name="What is your gender?"]:checked').val(),
                    q2: describeYou,
                    q3: topics,
                    q4: $('input[name="I like routine."]:checked').val(),
                    q5: $('input[name="I like structure."]:checked').val(),
                    q6: $('input[name="I am a perfectionist."]:checked').val(),
                    q7: $('input[name="It’s important for me and my family to achieve health ideals."]:checked').val(),
                    q8: $('input[name="I am a perfectionist."]:checked').val(),
                    q9: $('input[name="My family’s overall well-being is more important to me than achieving specific health ideals."]:checked').val(),
                    q10: $('#q9').val(),
                    q11: $('#q10').val(),
                    q12: $('#q11').val()
                },
            })
            .then(response => console.log(response))
            .catch(error => console.log(error.response))
        }
        else {
            let drName = $('#providerName').val();
            let phone = $('#providerPhone').val();
            let address = $('#providerAddress').val();
            axios.post('http://localhost:3000/provider/create',
                {
                    name: $('#username').val(),
                    drName: drName,
                    phone: phone,
                    address: address,
                    q1: $('input[name="What is your gender?"]:checked').val(),
                    q2: describeYou,
                    q3: topics,
                    q4: $('input[name="I like routine."]:checked').val(),
                    q5: $('input[name="I like structure."]:checked').val(),
                    q6: $('input[name="I am a perfectionist."]:checked').val(),
                    q7: $('input[name="It’s important for me and my family to achieve health ideals."]:checked').val(),
                    q8: $('input[name="I am a perfectionist."]:checked').val(),
                    q9: $('input[name="My family’s overall well-being is more important to me than achieving specific health ideals."]:checked').val(),
                    q10: $('#q9').val(),
                    q11: $('#q10').val(),
                    q12: $('#q11').val()
                })
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }
})