#!/usr/bin/env node

import Chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName;

// Helper functions
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

async function Welcome() {
  console.clear();
  console.log(
    gradient.pastel.multiline(
      figlet.textSync("Mohtasham Quiz Game", {
        font: "Big",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  const rainbowText = chalkAnimation.rainbow(
    "Welcome to the Mohtasham Quiz Game!\n"
  );
  await sleep(2000);
  rainbowText.stop();

  console.log(
    Chalk.bgBlue.white.bold(`
    ========================================
              HOW TO PLAY
    ========================================
    1. Enter your name
    2. Answer the questions correctly
    3. The game ends if you answer incorrectly
    ========================================
    `)
  );

  const response = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your name:",
      default: "Player",
    },
  ]);
  playerName = response.name;
  console.log(
    gradient.rainbow(
      `\nWelcome to the game, ${playerName}! Let's get started.\n`
    )
  );
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep(2000);

  if (isCorrect) {
    spinner.success({
      text: Chalk.greenBright(
        `Correct answer! Great job, ${playerName}. Keep it up!`
      ),
    });
  } else {
    spinner.error({
      text: Chalk.redBright(`Wrong answer! Sorry, ${playerName}. Game Over.`),
    });
    process.exit(1);
  }
}

// Question Bank
const questionBank = [
  {
    question: "Where does Mohtasham live?",
    options: ["Kuala Lumpur", "Delhi", "USA", "Kashmir"],
    correct: "Kuala Lumpur",
  },
  {
    question: "What programming language is Mohtasham most skilled in?",
    options: ["JavaScript", "Python", "Java", "Kotlin"],
    correct: "JavaScript",
  },
  {
    question: "What is Mohtasham's email address?",
    options: [
      "mohtasham123@gmail.com",
      "mohtashammurshid@gmail.com",
      "mohtasahmmurshid@gmail.com",
      "mohtasham.dev@gmail.com",
    ],
    correct: "mohtashammurshid@gmail.com",
  },
  {
    question: "Which framework does Mohtasham use for mobile development?",
    options: ["React Native", "Flutter", "Swift", "Ionic"],
    correct: "React Native",
  },
  {
    question: "What is the name of Mohtasham's online website project?",
    options: ["Portfolio Pro", "Credenza", "Portfolio Hub", "Resume Guru"],
    correct: "Credenza",
    additionalInfo: "Visit at: https://credenzaschool.vercel.app",
  },
  {
    question: "What does Mohtasham do for fun?",
    options: ["Valorant", "Football", "Running", "Reading"],
    correct: "Valorant",
  },
  {
    question: "What is the website URL of Mohtasham's online portfolio?",
    options: [
      "mohtasham.pages.dev",
      "mohtasham.pages",
      "mohtasham.dev",
      "mohtasham.io",
    ],
    correct: "mohtasham.pages.dev",
    additionalInfo: "Visit at: https://mohtasham.pages.dev",
  },
  {
    question: "Where does Mohtasham study?",
    options: ["APU", "Monash", "Taylors", "UM"],
    correct: "Taylors",
  },
  {
    question: "What is Mohtasham's favorite web framework?",
    options: ["Next JS", "Vanilla", "Flask", "Vue JS"],
    correct: "Next JS",
  },
  {
    question:
      "What is Mohtasham's GitHub profile name? (Hint: It's the same as his name)",
    options: [
      "Mohtasham",
      "MohtashamMurshid",
      "MohtashamGithub",
      "GithubMohtasham",
    ],
    correct: "MohtashamMurshid",
    additionalInfo: "Visit at: https://github.com/MohtashamMurshid",
  },
];

// Ask questions
async function askQuestion(questionObj) {
  const shuffledOptions = shuffleArray([...questionObj.options]);
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: questionObj.question,
      choices: shuffledOptions,
    },
  ]);

  if (questionObj.additionalInfo) {
    console.log(questionObj.additionalInfo);
  }

  await handleAnswer(answers.answer === questionObj.correct);
}

// Main Game Flow
await Welcome();
const shuffledQuestions = shuffleArray([...questionBank]);

for (const question of shuffledQuestions) {
  await askQuestion(question);
}

console.log(
  gradient.pastel(
    figlet.textSync(`Congrats, ${playerName}!`, {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);
console.log(
  gradient.rainbow(
    `🎉 Congratulations, ${playerName}! You've completed the Mohtasham Quiz Game! 🎉`
  )
);
