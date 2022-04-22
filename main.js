import pic1 from "./assets/김규민.jpeg";
import pic2 from "./assets/전희선.jpeg";
import pic3 from "./assets/서혜은.jpg";
import pic4 from "./assets/황주희.jpeg";
import pic5 from "./assets/백지연.png";

const $ = (selector) => document.querySelector(selector);

// 처음 진입 시
let currentStep = 0;
let currentScore = 0;
const quizList = [
  {
    src: pic1,
    answer: "김규민",
  },
  {
    src: pic2,
    answer: "전희선",
  },
  {
    src: pic3,
    answer: "서혜은",
  },
  {
    src: pic4,
    answer: "황주희",
  },
  {
    src: pic5,
    answer: "백지연",
  },
];
window.addEventListener('DOMContentLoaded', () => {
  addNewImage();
});

// 보기 선택
const $list = $('.answer__list');
const $imageBoard = $('.imageBoard');
$list.addEventListener('click', ({target}) => {
  target.closest('li') && handleOptionClick(target.closest('li')); 
})

function handleOptionClick(target){
  const answerName = quizList[currentStep].answer;
  const targetName = target.textContent;
  const isCorrect = answerName === targetName;
  
  if (!isCorrect) showNotCorrectModal();
  else {
    plusScore();
    handleNextStage();
  }
}

function showNotCorrectModal() {
  $('.modal__body').textContent = '나를 모른다고?';
  $('.modal').classList.remove('hide');
  removeNotCorrectModal();
}

function removeNotCorrectModal() {
  setTimeout(() => {
    $('.modal').classList.add('hide');
  }, 1000)
}

function plusScore() {
  currentScore++;
  $('.scoreBoard__score').textContent = currentScore;
}

// 다음 단계 이동
function handleNextStage() {
  if (currentStep === 4) handleLastStage();
  else {
    currentStep++;
    removeCurrentImage();
    addNewImage();
  }  
}

function removeCurrentImage(){
  $imageBoard.replaceChildren();
}

function addNewImage() {
  const imageElement = document.createElement('img');
  imageElement.src = quizList[currentStep].src;
  imageElement.alt = 'who is this';
  $imageBoard.appendChild(imageElement);
}

function handleLastStage() {
  $('.modal__body').textContent = '메인 화면으로';
  $('.modal').classList.remove('hide');
  addEventReturnClick();
}

function addEventReturnClick() {
  $('.modal').addEventListener('click', resetStage);
}

// 다시 하기 
$('.buttonList__shuffle').addEventListener('click', resetStage);
function resetStage() {
  resetStep();
  resetScore();
  removeCurrentImage();
  addNewImage();
  $('.modal').classList.add('hide');
}

function resetStep() {
  currentStep = 0;
}

function resetScore() {
  currentScore = 0;
  $('.scoreBoard__score').textContent = currentScore;
}