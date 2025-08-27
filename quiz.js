export const Quiz = async (sub) => {
    
    // FETCH QUESTIONS FROM JSON FILE
    const res = await fetch(sub);
    let data = await res.json();


    // INITIALIZE COUNT VARIABLES
    let index = 0;
    let scores = 0;


    // GET HTMLCollection (BUTTONS/DIVS...)
    const question = document.getElementById("question2");
    const progress = document.getElementById("progress");
    const answers = document.getElementById("answersTwo");
    const next = document.getElementById("next");
    const result = document.getElementById("result2");
    let answered = 1;


    // DISPLAY A QUESTION AND ITS OPTIONS
    function displayQuestion() {
        resetQuestion();
        
        let current = data[index];
        question.innerHTML = current.question;
    
        progress.textContent = `${answered} / ${data.length}`;
        answered++;
    
        current.answers.forEach(answer => {
            let button = document.createElement("button");
            button.textContent = answer.text;
            button.addEventListener("click", () => selectOption(button, answer.correct));
            
            answers.appendChild(button);
        });
    }



    // PREPARE DIV FOR THE displayQuestion() func
    function resetQuestion() {
        next.style.display = "none";
        answers.innerHTML = "";
    }



    // MARK SELECTED OPTION AND DISPLAYS NEXT BUTTON
    function selectOption(button, correct) {
        if (correct) {
            button.classList.add("correct");
            scores++;
        } else {
            button.classList.add("wrong");
        }
        
        
        Array.from(answers.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === data[index].answers.find(a => a.correct).text) {
            btn.classList.add("correct");
        }
        });
    
        next.style.display = "block";
    }



    // LOAD NEXT QUESTION SET
    next.addEventListener("click", () => {
        index++;
        if (index < data.length) {
            displayQuestion();
        } else {
            showResult();
        }
    });
    
    
    
    // DISPLAY RESULT AFTER QUIZ COMPLETION
    function showResult() {
        question.style.display = "none";
        answers.style.display = "none";
        next.style.display = "none";
        result.style.display = "block";
        result.innerHTML = `<h2>Your Score: ${scores} / ${data.length}</h2>`;
    }



    // INITIAL DECLARATION
    displayQuestion();
}
