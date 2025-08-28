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
    
        progress.textContent = `Question: ${answered} of ${data.length}`;
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
            next.innerText = "Finish";
            showResult();
        }
    });
    

    // GRADING FUNCTIONALITY
    function grading(score, overall, report) {
        if (score <= 5) {
            report.innerHTML = `<h3>Olodo Rapata!</h3>
                                <h3>You can do better....or not</h3>
                                <h2>Your Score: ${score} / ${overall.length}</h2>`;
        }
        else if (score > 5 && scores <= 13) {
            report.innerHTML = `<h3>Nice Try! There's room for improvement</h3>
                                <h2>Your Score: ${score} / ${overall.length}</h2>`;
        }
        else if (score > 13 && scores <= 19) {
            report.innerHTML = `<h3>Close Enough!</h3>
                                <h2>Your Score: ${score} / ${overall.length}</h2>`;
        }
        else {
            report.innerHTML = `<h3>Perfection! Or so you'd think</h3>
                                <h2>Your Score: ${score} / ${overall.length}</h2>`;
        }
    }
    

    const chooseSection = document.getElementById("selectCourse");
    const quizSection = document.getElementById("quiz-container");

    
    // DISPLAY RESULT AFTER QUIZ COMPLETION
    function showResult() {
        question.style.display = "none";
        progress.style.display = "none";
        answers.style.display = "none";
        result.style.display = "block";
        next.textContent = "End Quiz";
        next.addEventListener("click", () => {
            chooseSection.style.display = "block";
            quizSection.style.display = "none";
        });
    
        grading(scores, data, result);
    }



    // START QUIZ
    displayQuestion();
}
