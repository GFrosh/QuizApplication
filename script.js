import { Quiz } from "./quiz.js";

const options = document.getElementById("courseList");
const chooseBtn = document.getElementById("chooseButton");
let course = "./courses/biology/TypeA.json";


options.addEventListener('click', () => {
    options[0].disabled = true;
});
chooseBtn.addEventListener('click', () => {
    console.log(options.value);
});

function chooseCourse() {
    
}


Quiz(course);
