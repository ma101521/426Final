//This will be where we retrieve the username and password and either store it or authenticate it 


$(function() {
    //test loading
    $('.signupButton').click(SignUp);
    $('.loginButton').click(Login);

    function SignUp(event){
        event.preventDefault();
        //console.log($('#username').val());
        //console.log($('#password').val());

        let username = $('#username').val();
        let password = $('#password').val();

        axios.post('http://localhost:3000/account/create',
        {
          name: username,
          pass: password
        })
        .then(response => {
          if(response.status === 200){
            $('#errorBanner').empty();
            $('#errorBanner').append(`<p>Successfully made account!</p>`);
            setTimeout(function(){
              $('#errorBanner').empty()
              window.location.href = "survey.html";
            }, 3000);
            
          }
        }).catch(error => {
          $('#errorBanner').append(`<p>${error.response.data.msg}</p>`)
        });
    }

    function Login(event){
      event.preventDefault();

        let username = $('#username').val();
        let password = $('#password').val();

        axios.post('http://localhost:3000/account/login',
        {
          name: username,
          pass: password
        })
        .then(response => {
          console.log(response.status);
          if(response.status === 200){
            console.log(response.data.jwt)
            let jwt = response.data.jwt;
            axios.get('http://localhost:3000/account/status',
            {
              headers: {
                //jwt is the jwt from logging in
                "Authorization": "Bearer " + jwt
              },
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
            //window.location.href = "dashboard.html";
          }
        }).catch(error => {
          console.log(error);
        });  
    }
});