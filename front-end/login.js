//This will be where we retrieve the username and password and either store it or authenticate it 


$(function() {
    //test loading
    $('.signupButton').click(SignUp);
    $('.loginButton').click(Login);

    function SignUp(event){
        event.preventDefault();
        console.log($('#username').val());
        console.log($('#password').val());

        let email = $('#username').val();
        let password = $('#password').val();

        axios.post('http://localhost:3000/account/create',
        {
          name: email,
          pass: password
        })
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
    }

    function Login(event){
      event.preventDefault();
        console.log($('#username').val());
        console.log($('#password').val());

        let email = $('#username').val();
        let password = $('#password').val();

        axios.post('http://localhost:3000/account/login',
        {
          name: email,
          pass: password
        })
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });  
    }
});