const readLine = require('readline-sync');
const chalk = require('chalk');
const log = console.log;
const endScore = chalk.magenta.bold;
const inputText = chalk.blue.italic.bold;
const levelText = chalk.yellow.bold;
const questionText = chalk.yellow;
const correctAnswerText = chalk.green.bold;
const wrongAnswerText = chalk.red.bold;
let userName = ''
let score = 0;
const levelOne = [{
  question: "Tum aur tumhare pitaji ke paas to ...",
  choices: ["duniya bhar ka gyaan hai",
    "bohot daulat hai",
    "duniya bhar ka paisa hai",
    "extra angootha hai"],
  answer: "duniya bhar ka paisa hai"
}, {
  question: "Chilla Chilla ke sabko ... ",
  choices: ["team bata de",
    "scheme bata de",
    "meme bata de",
    "dream bata de"],
  answer: "scheme bata de"
}, {
  question: "Ye bik gyi hai ... ",
  choices: ["Paper mint",
    "ES Lint",
    "Beer Pint",
    "Gormint"],
  answer: "Gormint"
}]
const levelTwo = [{
  question: "A disappointed man in the audience looking at the sport became a trending meme, that sport was ...",
  choices: ["football",
    "hockey",
    "badminton",
    "cricket"],
  answer: "cricket"
}, {
  question: "An Indian Rapper was flexing upon one of his belonging on Instagram live, which gave rise to many reels and trolls using the same line, he was flexing upon the price of his... ",
  choices: ["watch",
    "car",
    "shoes",
    "clothes"],
  answer: "shoes"
}]
const endMessage = `Aapka safar yahi samaapt hota hai, ummeed hai, aapane aanand liya hoga aur achchha samay bitaaya hoga.`

function welcomeUser() {
  userName = readLine.question(inputText('Please enter your Name '));
  log(inputText(`Hello  ${userName}!`));
}

function greetings() {
  log(inputText(`Let's check if your meme game is on point or not.`))
  defineRules();
}

function defineRules() {
  log(inputText(`Ye ek sasta KBC hai, just for fun, so try to read in Amitabh Sir voice:`));
  log(levelText(`Level 1:Aapke screen par kuch adhoore meme dialogs diye jaenge, aapako sahee jawaab ka number bataana hoga.

Teen mai se do jawab sahi hone par hum agle padaav ki or badege.`));
  startLevel(levelOne);
  score > 1 ? levelOneCleared() : failed();
}

// Function to get the response of question
function startLevel(level) {
  // Main question loop and responses
  for (let i = 0; i < level.length; i++) {
    log(inputText(`Question ${i + 1}`))
    log(questionText(level[i].question))
    const options = level[i].choices
    const responseIndex = readLine.keyInSelect(options, level[i].question);
    level[i].answer === options[responseIndex]
      ? positiveResponse(level[i].answer)
      : negativeResponse(level[i].answer);

    // For level 2 wrong answer
    if (level == levelTwo && level[i].answer !== options[responseIndex]) {
      failed();
      break;
    };
    // For level 2 end
    if (level == levelTwo && i == level.length - 1) {
      levelTwoCleared();
    }
  }
}

function positiveResponse(answer) {
  score = score + 1;
  log(correctAnswerText(`"${answer}" sahi jawab, aapko milta hai 1 point. `))
  displayScore();
}

function negativeResponse(answer) {
  log(wrongAnswerText(`Galat uttar, Sahi uttar hai "${answer}"`))
  displayScore();
}

function displayScore() {
  log(`Apka score hota hai: ${score}`);
}

function levelTwoInstructions() {
  log(levelText(`Level 2: Is padaav mai aapke samne memes ka varnan kiya jayega aur aapako anumaan lagaana hoga ki yah kis se sambandhit hai

Jeetne ke lie sabhee prashnon ka sahee uttar dena zaroori hai, koi bhi 
 Galat jawab dene par aap khel se bahaar ho jayege.`));
  if (readLine.keyInYNStrict(questionText('Kya aap hamare sath bane rehna chahenge?'))) {
    startLevel(levelTwo)
  } else {
    log(endScore(`Apka final score hai: ${score}`));
    log(inputText(endMessage));
  }
}

function levelOneCleared() {
  log(inputText(`Aap pahla padaav paar kar chuke hai, bohat boht mubaaraq, ab hum chalte agle padaav par.`))
  levelTwoInstructions()
}

function failed() {
  log(chalk.bgRed(endMessage));
  restartOption()
}

function levelTwoCleared() {
  log(inputText(`Meme ke gyaan ka shaandaar pradarshan, bohot hi umda khele aap`));
  log(endScore(`Apka final score hai: ${score}`))
  restartOption();
}
function resetScore() {
  score = 0;
}
function restartOption() {
  if (readLine.keyInYNStrict(questionText('Do you want to restart?'))) {
    console.clear();
    resetScore()
    defineRules();
    startLevel(levelOne);
    score > 1 ? levelOneCleared() : failed();
  }
  else {
    console.clear();
    log(inputText(`Thanks for playing ${userName}.`))
  }
}


welcomeUser();
greetings();