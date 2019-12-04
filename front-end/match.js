//Match percentages will be based on the scoring table 
/*Each MC question will have a percentage value associated with its importance along with a percentage 
  value for each associated question
     - answers are also given a score for thier relationship to the matched answer 
     -  Close answers are given .5 of the total point value, further answers can be given 0
        all others are given 0
*/

/*+++++++++++++++POINT VALUES++++++++++++++++++
                    q1 : 1
                    q2 : 1
                    q3 : 6
                    q4 : 1
                    q5 : 1
                    q6 : 1
                    q7 : 1
                    q8 : 1
                    q9 : 1
                    q10: 3
                    q11: 3
*/


//Survey Java script value (based on login)
//How are checkboxes and radio buttons stored??
//Attach each question with a console.log() to see how the data is being stored
//patient and provoider as parameters will not need to get results in function 

function scoreAndCompare(patient, provider){
        //Make sure no one misses a quesiton
        let count = 0; 
        let patient = {}
        //Retrive patient object
        let provider = {}
        //Retrive patient object
        /*MC:
        score values will be stored based on their relationship to the corect answer
        if (patient answers = provider answers + 1 * pointvalue for that question)
        else(Check to see if your answer is within range of getting points) { credit ginven * point value for that quesiton}*/
        
        //Check Box: matched boxes checked from paitients/ total number of quesitons in check box (for each question)
        //count the total number that are the same even the omited question: treat each check box question like a mini survey
        
        
        
        //Slider will check how close the value is to the health provider's and multiply that by the point value awarded for that question
        //Have ranges
        
        // Difference between the numbers 
        // If possitve subtract if negative add 
        // x = 10 - (or + if negative) difference
        // x * (question value)/10 = points awarded 
}
    
function calculateMatchPercentage(pointCount){
        //We will put the percentages in some sor of accumulator and get the resuls here
    return pointcount/20;
}
    
