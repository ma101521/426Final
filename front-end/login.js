//This will be where we retrieve the username and password and either store it or authenticate it 


$(function() {
    //test loading

    let token = localStorage.getItem('jwt');
    //console.log(token);
    $('.signupButton').click(SignUp);
    $('.loginButton').click(Login);
    $('.deletButton').click(Delete);
    $('#showLogin').click(showLogin);

    function SignUp(event){
        event.preventDefault();
        $('#errorBanner').empty()
        //console.log(token);
        let username = $('#username').val();
        let password = $('#password').val();

        axios.post('http://localhost:3000/account/create',
        {
          name: username,
          pass: password
        })
        .then(response => {
          if(response.status === 200){
            axios.post('http://localhost:3000/account/login',
            {
              name: username,
              pass: password
            })
            .then(response => {
              if(response.status === 200){
                console.log(response)
                console.log(response.data.jwt)
                let jwt = response.data.jwt;
                localStorage.setItem('jwt', jwt);
              }
            })
            .catch(error => console.log(error))
            $('#errorBanner').empty();
            $('#errorBanner').append(`<p>Successfully made account!</p>`);
            setTimeout(function(){
              $('#errorBanner').empty()
              window.location.href = "survey.html";
            }, 1500);
            
          }
        }).catch(error => {
          $('#errorBanner').append(`<p>${error.response.data.msg}</p>`);
          setTimeout(() => {
            $('#errorBanner').empty()
          }, 3000);
        }); 
    }

    function Login(event){
      event.preventDefault();
        //console.log(token);
        let username = $('#username').val();
        let password = $('#password').val();

        $('#errorBanner').empty()
        axios.post('http://localhost:3000/account/login',
        {
          name: username,
          pass: password
        })
        .then(response => {
          console.log(response.status);
          if(response.status === 200){
            //console.log(response.data.jwt)
            let jwt = response.data.jwt;
            localStorage.setItem('jwt', jwt);
            axios.get('http://localhost:3000/account/status',
            {
              headers: {
                //jwt is the jwt from logging in
                "Authorization": "Bearer " + jwt
              },
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
            window.location.href = "dashboard.html";
          }
        }).catch(error => {
          $('#errorBanner').append(`<p>${error.response.data.msg}</p>`);
          setTimeout(() => {
            $('#errorBanner').empty()
          }, 3000);
        })  
    }

    function Delete(event){
      event.preventDefault();
      console.log('delete');
      let username = $('#username').val();
      console.log(username);
      axios.delete('http://localhost:3000/account/'+username)
      .then(response=> console.log(response))
      .catch(error => console.log(error.response))
    }

    function showLogin(event){
      event.preventDefault();
      $('#signupBox').replaceWith(`<div id="loginBox" class="control content has-text-centered">
      <button type="submit" class="button is-purple loginButton">
          Login
      </button>
      <div id ="showSignup">
          <a href="/#">Don't have an account? Create Account Here!</a>
      </div>
  </div>`);
      $('#showSignup').click(showSignUp);
      $('.loginButton').click(Login);
    }

    function showSignUp(event){
      event.preventDefault();
      $('#loginBox').replaceWith(`<div id="signupBox" class="control content has-text-centered">
      <button type="submit" class="button is-purple loginButton">
          Sign Up
      </button>
      <div id ="showLogin">
        <a href="/#">Already have an account? Login Here!</a>
      </div>
  </div>`);
      $('#showLogin').click(showLogin);
      $('.signupButton').click(SignUp);
    }
});