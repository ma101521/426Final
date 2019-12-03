
$(function() {

    $('#submitbutton').click(create);
    $('#providerRadio').on("change", function(){
        $('#providerForm').show()
    })
    $('#patientRadio').on("change", function(){
        $('#providerForm').hide()
    })


    function create(event){
        event.preventDefault();
        console.log('hi');
        let describeYou = [];
            $.each($('input[name="Which of the following statements describe you. Please check all that apply."]:checked'), function(){
                describeYou.push($(this).val());
            });
        console.log(describeYou);
        let type = $('input[name="I am a"]:checked').val();
        if(type == 'patient'){
            axios.post('http://localhost:3000/patient/create',
            {
                name: $('#username').val(),
                q1: $('input[name="What is your gender?"]:checked').val(),
                q2: describeYou,
                q3: $('input[name="What topics are you interested in learning more about? Please check all that apply."]:checked').val(),
                q4: $('input[name="I like routine."]:checked').val(),
                q5: $('input[name="I like structure."]:checked').val(),
                q6: $('input[name="I am a perfectionist."]:checked').val(),
                q7: $('input[name="It’s important for me and my family to achieve health ideals."]:checked').val(),
                q8: $('input[name="I am a perfectionist."]:checked').val(),
                q9: $('input[name="My family’s overall well-being is more important to me than achieving specific health ideals."]:checked').val(),
                q10:$('#q9').val(),
                q11:$('#q10').val(),
                q12:$('#q11').val()
                
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
            .then(response=> console.log(response))
            .catch(error=> console.log(error))
        }
    }
})