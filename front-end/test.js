
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
    $('#deleteProvider').click(deleteProvider);
    $('#deletePatient').click(deletePatient);

    function deleteProvider(event){
        event.preventDefault();
        let provider = $('#username').val();
        console.log('delete provider ' + provider);
        axios.delete('http://localhost:3000/provider/'+provider)
        .then(response=> console.log(response))
        .catch(error => console.log(error.response))
    }

    function deletePatient(event){
        event.preventDefault();
        let patient = $('#username').val();
        console.log('delete patient ' + patient);
        axios.delete('http://localhost:3000/patient/'+patient)
        .then(response=> console.log(response))
        .catch(error => console.log(error.response))
    }

    function getAllProviders(event) {
        event.preventDefault();
        axios.get('http://localhost:3000/provider/all',
        {
        headers: {
            //jwt is the jwt from logging in
            "Authorization": "Bearer " + jwt
        }})
            .then(response => console.log(response))
            .catch(error => console.log(error.response))
    }

    function getUser(event) {
        event.preventDefault();
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
        let describeYoucheck = [];
        let describeYouUncheck = [];
        let ans1 = ['a1', 'a2', 'a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13'];
        ans1.forEach(answer => {
            if (document.getElementById(answer).checked){
                describeYoucheck.push(document.getElementById(answer).value)
            }
            else{
                describeYouUncheck.push(document.getElementById(answer).value)
            }
        })
        let describeYou = {'checked': describeYoucheck, 'unchecked': describeYouUncheck}
        let topicscheck = [];
        let topicsUncheck = [];
        let ans2 = ['a21', 'a22', 'a23','a24','a25','a26','a27','a28','a29','a210','a211','a212'];
        ans2.forEach(answer => {
            if (document.getElementById(answer).checked){
                topicscheck.push(document.getElementById(answer).value)
            }
            else{
                topicsUncheck.push(document.getElementById(answer).value)
            }
        })
        let topics = {'checked': topicscheck, 'unchecked': topicsUncheck};
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
            axios({
                method: 'post',
                url: 'http://localhost:3000/provider/create',
                headers: {
                    //jwt is the jwt from logging in
                    "Authorization": "Bearer " + jwt
                },
                data:{
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
                },
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
        }
    }
})