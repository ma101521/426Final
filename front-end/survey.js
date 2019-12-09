$(function(){

    $('#providerRadio').on("change", function () {
        let questions = $("#matchQuestions");
        questions.empty();
        questions.append(`
        <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">What is your gender? </h4>
                    <hr>
                    <div class="control">
                        <input type="radio" name="What is your gender?" value="Male" class="radio" required>Male<BR>
                        <input type="radio" name="What is your gender?" value="Female" class="radio" required>Female<BR>
                        <input type="radio" name="What is your gender?" value="Non-binary" class="radio" required>Non-binary<BR>
                    </div>
                </div>

            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">Which of the following types of patients do you have experience helping? Check all that apply.</h4>
                    <hr>
                    <div class="control">
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am interested in becoming a parent in the future." class="checkbox" id="a1"> <span class="checkmark"></span> Patients who are interested in becoming a parent in the future.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am interested in becoming a parent through fostering and/or adoption in the future." id="a2" class="checkbox"> Patients who are interested in becoming a parent through fostering and/or adoption in the future.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am interested in becoming pregnant in the future." class="checkbox" id="a3"> Patients who are interested in becoming pregnant in the future.<BR>
                        
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am pregnant." class="checkbox" id="a4"> Patients who are pregnant.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am 0-3 months postpartum." class="checkbox" id="a5"> Patients who are 0-3 months postpartum.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am 3-6 months postpartum." class="checkbox" id ="a6"> Patients who are 3-6 months postpartum.<BR>

                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a newborn." class="checkbox" id="a7"> Patients who are a parent to a newborn.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to an infant." class="checkbox" id="a8"> Patients who are a parent to an infant.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a toddler (1-4 years old)." id = "a9" class="checkbox"> Patients who are a parent to a toddler (1-4 years old).<BR>

                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a child who is 5-7 years old." class="checkbox" id="a10"> Patients who are a parent to a child who is 5-7 years old.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a child who is 8 + years old." class="checkbox" id="a11"> Patients who are a parent to a child who is 8 + years old.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent of twins." class="checkbox" id="a12"> Patients who are a parent of twins.<BR>
                        <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a foster parent." class="checkbox" id="a13"> Patients who are a foster parent.<BR>   
                    </div>    
                </div>                   
            </div>

            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">What topics are you knowledgeable about? Please check all that apply. </h4>
                    <hr>
                    <div class="control">
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition for fertility " class="checkbox" id="a21"> Nutrition for fertility<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition during pregnancy " class="checkbox" id="a22"> Nutrition during pregnancy<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition after giving birth" class="checkbox" id="a23"> Nutrition after giving birth<BR>
                        
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Healthy recipes" class="checkbox" id="a24"> Healthy recipes<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Meal planning" class="checkbox" id="a25"> Meal planning<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value= "Breastfeeding" class="checkbox" id="a26"> Breastfeeding<BR>

                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Infant-feeding" class="checkbox" id="a27"> Infant-feeding<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Introducing solid foods" class="checkbox" id="a28"> Introducing solid foods<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition for toddlers" class="checkbox" id="a29"> Nutrition for toddlers<BR>

                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Food allergies, intolerances, and sensitivities " class="checkbox" id="a210"> Food allergies, intolerances, and sensitivities <BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Self-care" class="checkbox" id="a211"> Self-care<BR>
                        <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Body image" class="checkbox" id="a212"> Body image<BR>  
                    </div>  
                </div>                     
            </div>

            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with each of the following statement? Please select one response. </h4>
                    <h4 class = "subtitle has-text-grey"> “I like routine.”</h4>
                    <hr>
                    <div class="control">
                        <input type="radio" name= "I like routine." value= 5 class="radio">Strongly agree<BR>
                        <input type="radio" name= "I like routine." value= 4 class="radio">Agree<BR>
                        <input type="radio" name= "I like routine." value= 3 class="radio">Neither agree nor disagree<BR>
                        <input type="radio" name= "I like routine." value= 2 class="radio">Disagree<BR>
                        <input type="radio" name= "I like routine." value= 1 class="radio">Strongly Disagree<BR>
                    </div> 
                </div>                      
            </div>

            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                    <h4 class = "subtitle has-text-grey"> “I like structure.”</h4>
                    <hr>
                    <div class="control">
                        <input type="radio" name= "I like structure." value= 5 class="radio">Strongly agree<BR>
                        <input type="radio" name= "I like structure." value= 4 class="radio">Agree<BR>
                        <input type="radio" name= "I like structure." value= 3 class="radio">Neither agree nor disagree<BR>
                        <input type="radio" name= "I like structure." value= 2 class="radio">Disagree<BR>
                        <input type="radio" name= "I like structure." value= 1 class="radio">Strongly Disagree<BR>
                    </div> 
                </div>                      
            </div>

            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                    <h4 class = "subtitle has-text-grey"> “I am a perfectionist.”</h4>
                    <hr>
                    <div class="control">
                        <input type="radio" name= "I am a perfectionist." value= 5 class="radio">Strongly agree<BR>
                        <input type="radio" name= "I am a perfectionist." value= 4 class="radio">Agree<BR>
                        <input type="radio" name= "I am a perfectionist." value= 3 class="radio">Neither agree nor disagree<BR>
                        <input type="radio" name= "I am a perfectionist." value= 2 class="radio">Disagree<BR>
                        <input type="radio" name= "I am a perfectionist." value= 1 class="radio">Strongly Disagree<BR>
                    </div>    
                </div>                   
            </div>
            
            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                    <h4 class = "subtitle has-text-grey"> “It’s important for my patients and their families to achieve health ideals.”</h4>
                    <hr>
                    <div class="control">
                        <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 5 class="radio">Strongly agree<BR>
                        <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 4 class="radio">Agree<BR>
                        <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 3 class="radio">Neither agree nor disagree<BR>
                        <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 2 class="radio">Disagree<BR>
                        <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 1 class="radio">Strongly Disagree<BR>
                    </div>   
                </div>                    
            </div>
            
            <div class = "question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                    <h4 class = "subtitle has-text-grey"> “My patient's family’s overall well-being is more important to me than my patient achieving specific health ideals.”</h4>
                    <hr>
                    <div class="control">
                        <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 5 class="radio">Strongly agree<BR>
                        <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 4 class="radio">Agree<BR>
                        <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 3 class="radio">Neither agree nor disagree<BR>
                        <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 2 class="radio">Disagree<BR>
                        <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 1 class="radio">Strongly Disagree<BR>
                    </div>  
                </div>                     
            </div>

            <div class="question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">How would you prefer your patients approach raising a healthy family?</h4>
                    <hr>
                    <div class="columns">
                        <div class="column is-one-quarter has-text-centered">
                            <h4>Researching information from the internet, books, and other people</h4>
                        </div>
                        <div class="column is-one-half has-text-centered">
                            <input type="range" min="0" max="10" value="5" class="slider" id="q9"></input>
                        </div>
                        <div class="column is-one-quarter has-text-centered">
                            <h4>Going with my gut</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">Who do you prefer patients turn to for advice that they trust?</h4>
                    <hr>
                    <div class="columns">
                        <div class="column is-one-quarter has-text-centered">
                            <h4>Health Professionals</h4>
                        </div>
                        <div class="column is-one-half has-text-centered">
                            <input type="range" min="0" max="10" value="5" class="slider" id="q10"></input>
                        </div>
                        <div class="column is-one-quarter has-text-centered">
                            <h4>Friends and Family</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="question">
                <div class="box">
                    <h4 class = "subtitle has-text-weight-bold">On average, how much time would you like your patients to spend preparing meals for their family? </h4>
                    <hr>
                    <div class="columns">
                        <div class="column is-one-quarter has-text-centered">
                            <h4>0 Minutes</h4>
                        </div>
                        <div class="column is-one-half has-text-centered">
                            <input type="range" min="0" max="10" value="5" class="slider" id="q11"></input>
                        </div>
                        <div class="column is-one-quarter has-text-centered">
                            <h4>90 Minutes</h4>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })

    $("#patientRadio").on("change", function(){
        let questions = $("#matchQuestions");
        questions.empty();
        questions.append(`
        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">What is your gender? </h4>
                <hr>
                <div class="control">
                    <input type="radio" name="What is your gender?" value="Male" class="radio" required>Male<BR>
                    <input type="radio" name="What is your gender?" value="Female" class="radio" required>Female<BR>
                    <input type="radio" name="What is your gender?" value="Non-binary" class="radio" required>Non-binary<BR>
                </div>
            </div>
        </div>

        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">Which of the following statements describe you? Please check all that apply. </h4>
                <hr>
                <div class="control">
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am interested in becoming a parent in the future." class="checkbox" id="a1"> <span class="checkmark"></span> I am interested in becoming a parent in the future.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am interested in becoming a parent through fostering and/or adoption in the future." id="a2" class="checkbox"> I am interested in becoming a parent through fostering and/or adoption in the future.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am interested in becoming pregnant in the future." class="checkbox" id="a3"> I am interested in becoming pregnant in the future.<BR>
                    
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am pregnant." class="checkbox" id="a4"> I am pregnant.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am 0-3 months postpartum." class="checkbox" id="a5"> I am 0-3 months postpartum.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am 3-6 months postpartum." class="checkbox" id ="a6"> I am 3-6 months postpartum.<BR>

                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a newborn." class="checkbox" id="a7"> I am a parent to a newborn.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to an infant." class="checkbox" id="a8"> I am a parent to an infant.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a toddler (1-4 years old)." id = "a9" class="checkbox"> I am a parent to a toddler (1-4 years old).<BR>

                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a child who is 5-7 years old." class="checkbox" id="a10"> I am a parent to a child who is 5-7 years old.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent to a child who is 8 + years old." class="checkbox" id="a11"> I am a parent to a child who is 8 + years old.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a parent of twins." class="checkbox" id="a12"> I am a parent of twins.<BR>
                    <input type="checkbox" name="Which of the following statements describe you. Please check all that apply." value="I am a foster parent." class="checkbox" id="a13"> I am a foster parent.<BR>   
                </div>    
            </div>                   
        </div>

        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">What topics are you interested in learning more about? Please check all that apply. </h4>
                <hr>
                <div class="control">
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition for fertility " class="checkbox" id="a21"> Nutrition for fertility<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition during pregnancy " class="checkbox" id="a22"> Nutrition during pregnancy<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition after giving birth" class="checkbox" id="a23"> Nutrition after giving birth<BR>
                    
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Healthy recipes" class="checkbox" id="a24"> Healthy recipes<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Meal planning" class="checkbox" id="a25"> Meal planning<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value= "Breastfeeding" class="checkbox" id="a26"> Breastfeeding<BR>

                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Infant-feeding" class="checkbox" id="a27"> Infant-feeding<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Introducing solid foods" class="checkbox" id="a28"> Introducing solid foods<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Nutrition for toddlers" class="checkbox" id="a29"> Nutrition for toddlers<BR>

                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Food allergies, intolerances, and sensitivities " class="checkbox" id="a210"> Food allergies, intolerances, and sensitivities <BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Self-care" class="checkbox" id="a211"> Self-care<BR>
                    <input type="checkbox" name="What topics are you interested in learning more about? Please check all that apply." value="Body image" class="checkbox" id="a212"> Body image<BR>  
                </div>  
            </div>                     
        </div>

        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with each of the following statement? Please select one response. </h4>
                <h4 class = "subtitle has-text-grey"> “I like routine.”</h4>
                <hr>
                <div class="control">
                    <input type="radio" name= "I like routine." value= 5 class="radio">Strongly agree<BR>
                    <input type="radio" name= "I like routine." value= 4 class="radio">Agree<BR>
                    <input type="radio" name= "I like routine." value= 3 class="radio">Neither agree nor disagree<BR>
                    <input type="radio" name= "I like routine." value= 2 class="radio">Disagree<BR>
                    <input type="radio" name= "I like routine." value= 1 class="radio">Strongly Disagree<BR>
                </div> 
            </div>                      
        </div>

        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                <h4 class = "subtitle has-text-grey"> “I like structure.”</h4>
                <hr>
                <div class="control">
                    <input type="radio" name= "I like structure." value= 5 class="radio">Strongly agree<BR>
                    <input type="radio" name= "I like structure." value= 4 class="radio">Agree<BR>
                    <input type="radio" name= "I like structure." value= 3 class="radio">Neither agree nor disagree<BR>
                    <input type="radio" name= "I like structure." value= 2 class="radio">Disagree<BR>
                    <input type="radio" name= "I like structure." value= 1 class="radio">Strongly Disagree<BR>
                </div> 
            </div>                      
        </div>

        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                <h4 class = "subtitle has-text-grey"> “I am a perfectionist.”</h4>
                <hr>
                <div class="control">
                    <input type="radio" name= "I am a perfectionist." value= 5 class="radio">Strongly agree<BR>
                    <input type="radio" name= "I am a perfectionist." value= 4 class="radio">Agree<BR>
                    <input type="radio" name= "I am a perfectionist." value= 3 class="radio">Neither agree nor disagree<BR>
                    <input type="radio" name= "I am a perfectionist." value= 2 class="radio">Disagree<BR>
                    <input type="radio" name= "I am a perfectionist." value= 1 class="radio">Strongly Disagree<BR>
                </div>    
            </div>                   
        </div>
        
        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                <h4 class = "subtitle has-text-grey"> “It’s important for me and my family to achieve health ideals.”</h4>
                <hr>
                <div class="control">
                    <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 5 class="radio">Strongly agree<BR>
                    <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 4 class="radio">Agree<BR>
                    <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 3 class="radio">Neither agree nor disagree<BR>
                    <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 2 class="radio">Disagree<BR>
                    <input type="radio" name= "It’s important for me and my family to achieve health ideals." value= 1 class="radio">Strongly Disagree<BR>
                </div>   
            </div>                    
        </div>
        
        <div class = "question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">How much do you agree or disagree with the following statement? Please select one response. </h4>
                <h4 class = "subtitle has-text-grey"> “My family’s overall well-being is more important to me than achieving specific health ideals.”</h4>
                <hr>
                <div class="control">
                    <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 5 class="radio">Strongly agree<BR>
                    <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 4 class="radio">Agree<BR>
                    <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 3 class="radio">Neither agree nor disagree<BR>
                    <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 2 class="radio">Disagree<BR>
                    <input type="radio" name= "My family’s overall well-being is more important to me than achieving specific health ideals." value= 1 class="radio">Strongly Disagree<BR>
                </div>  
            </div>                     
        </div>

        <div class="question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">How do you approach raising a healthy family?</h4>
                <hr>
                <div class="columns">
                    <div class="column is-one-quarter has-text-centered">
                        <h4>Researching information from the internet, books, and other people</h4>
                    </div>
                    <div class="column is-one-half has-text-centered">
                        <input type="range" min="0" max="10" value="5" class="slider" id="q9"></input>
                    </div>
                    <div class="column is-one-quarter has-text-centered">
                        <h4>Going with my gut</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">Who do you turn to for advice that you trust?</h4>
                <hr>
                <div class="columns">
                    <div class="column is-one-quarter has-text-centered">
                        <h4>Health Professionals</h4>
                    </div>
                    <div class="column is-one-half has-text-centered">
                        <input type="range" min="0" max="10" value="5" class="slider" id="q10"></input>
                    </div>
                    <div class="column is-one-quarter has-text-centered">
                        <h4>Friends and Family</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="question">
            <div class="box">
                <h4 class = "subtitle has-text-weight-bold">On average, how much time do you spend preparing a meal for your family? </h4>
                <hr>
                <div class="columns">
                    <div class="column is-one-quarter has-text-centered">
                        <h4>0 Minutes</h4>
                    </div>
                    <div class="column is-one-half has-text-centered">
                        <input type="range" min="0" max="10" value="5" class="slider" id="q11"></input>
                    </div>
                    <div class="column is-one-quarter has-text-centered">
                        <h4>90 Minutes</h4>
                    </div>
                </div>
            </div>
        </div>
        `);
    })
})