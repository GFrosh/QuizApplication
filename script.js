import { Quiz } from "./quiz.js";

const options = document.getElementById("courseList");
const chooseBtn = document.getElementById("chooseButton");
const chooseSection = document.getElementById("selectCourse");
const quizSection = document.getElementById("quiz-container");
const selectedCourse = document.getElementById("selectedCourse");

let type = "TypeA";

function toggleSection(sectionA, sectionB) {
    sectionA.style.display = "none";
    sectionB.style.display = "block"
}

function generatePath(cose, tipe) {
    return `./courses/${cose}/${tipe}.json`;
}
toggleSection(quizSection, chooseSection);




options.addEventListener('click', () => {
    options[0].disabled = true;
});
chooseBtn.addEventListener('click', () => {
    let selected = options.value;
    if (selected !== "default") {
        toggleSection(chooseSection, quizSection);
        Quiz(generatePath(selected, type));
        selectedCourse.innerText = selected.toUpperCase();
    } else {
        alert("Please select a valid course!🙏");
    }
});
