//Match percentages will be based on the scoring table 
/*Each MC question will have a percentage value associated with its importance along with a percentage 
  value for each associated question
     - answers are also given a score for thier relationship to the matched answer 
     -  Close answers are given .5 of the total point value, further answers can be given 0
        all others are given 0
*/

function getResults(){
    $(document).ready(function(){
        $("form#Survey").submit(function(event){
          event.preventDefault();
        //figure out how to store these values in the object key? do we want to heirarchal key like in a03?
          $("input:checkbox[name=Which of the following statements describe you. Please check all that apply.]:checked").each(function(){
            var workTransportationMode = $(this).val();
        });

        //figure out how to store these values in the object key? do we want to heirarchal key like in a03?
        $("input:checkbox[name=Which of the following statements describe you. Please check all that apply.]:checked").each(function(){
            var workTransportationMode = $(this).val();
        });
    });
});

//Survey Java script value (based on login)
//How are checkboxes and radio buttons stored??
//Attach each question with a console.log() to see how the data is being stored

function scoreAndCompare(){
    //Make sure no one misses a quesiton
    let count = 0; 

    let patient = {}
    //Retrive patient object

    let provider = {}
    //Retrive patient object

    /*MC:
    score values will be stored based on their relationship to the corect answer
    if (patient answers = provider answers + 1 * pointvalue for that question)
    else(Check to see if your answer is within range of getting points) { credit ginven * point value for that quesiton}*/

    if(patient['What is your gender?'] == provider['What is your gender?']){
        count++;
    }

    //Is there a way to traverse through these? 
    if(patient['I like routine.'] == provider['I like routine.']){
        count++;
    }
    else if(patient['I like routine.'] == provider['I like routine.']-1 || patient['I like routine.'] == provider['I like routine.']+1){
        count = count + .5; 
    }

    



    //Check Box: matched boxes checked from paitients/ total number of quesitons in check box (for each question)
    //count the total number that are the same even the omited question: treat each check box question like a mini survey
    
    
    //Slider will check how close the value is to the health provider's and multiply that by the point value awarded for that question
    //Have ranges 

}

function calculateMatchPercentage(count){
    //We will put the percentages in some sor of accumulator and get the resuls here
}
