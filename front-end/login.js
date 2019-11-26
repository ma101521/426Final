//This will be where we retrieve the username and password and either store it or authenticate it 


$(function() {
    //test loading
    $('.signupButton').click(logSignUp);

    function logSignUp(event){
        event.preventDefault();
        console.log("hi");
        console.log(event.currentTarget);
        console.log($('#email').val());
        console.log($('#password').val());

        let email = $('#email').val();
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
});