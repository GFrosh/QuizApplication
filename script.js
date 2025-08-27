import { Quiz } from "./quiz.js";

const options = document.getElementById("courseList");
const chooseBtn = document.getElementById("chooseButton");
const chooseSection = document.getElementById("selectCourse");
const quizSection = document.getElementById("quiz-container");

let typeIndex = 0;
let course = {
    biology: ["./courses/biology/TypeA.json", "./courses/biology/TypeB.json", "./courses/biology/TypeC.json", "./courses/biology/TypeD.json", "./courses/biology/TypeE.json"],
    ins: ["I think it works", "Or not"]
}

function chooseCourse() {
    quizSection.style.display = "none";
    console.log(chooseSection);

}

options.addEventListener('click', () => {
    options[0].disabled = true;
});
chooseBtn.addEventListener('click', () => {
    console.log(options.value);
    console.log(course);
    chooseCourse();
});


Quiz(course.biology[0]);
