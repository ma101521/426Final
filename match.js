//Match percentages will be based on the scoring table 
/*Each MC question will have a percentage value associated with its importance along with a percentage 
  value for each associated question
     - answers are also given a score for thier relationship to the matched answer 
     -  Close answers are given .7 or .5 of the total point value, further answers can be given .2 
        all others are given 0
*/

function getResults(){
    let patient = users.find(user => username = user1)
    let answers = []
    answers[0] = patient["I am a"];
    answers[1] = patient["What is your gender?"];
    //Storing info from a check box with multiple answers
    //Do we want to use a list?  
    answers[2] = patient["Which of the following statements describe you. Please check all that apply."];

}

function scoreAndCompare(){
    /*MC:
    score values will be stored based on their relationship to the corect answer
    if (patient answers = provider answers + 1 * pointvalue for that question)
    else(Check to see if your answer is within range of getting points) { credit ginven * point value for that quesiton}*/

    //Check Box: matched boxes checked from paitients/total boxes checked by the provider (for each question)

    //Slider will check how close the value is to the health provider's and multiply that by the point value awarded for that question

}

function calculateMatchPercentage(){
    //We will put the percentages in some sor of accumulator and get the resuls here 
}