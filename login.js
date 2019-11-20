//This will be where we retrieve the username and password and either store it or authenticate it 


$(function() {
    //test loading
    $('.signupButton').click(logSignUp);

    function logSignUp(event){
        console.log("hi");
        console.log(event.currentTarget);
        console.log($('#email').val());
        console.log($('#password').val());
    }
});