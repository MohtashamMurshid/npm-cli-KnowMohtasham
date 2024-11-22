#!/usr/bin/env node

import Chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function Welcome() {
  const raibowtext = chalkAnimation.rainbow("Welcome to the Game \n");
  await sleep(2000);
  raibowtext.stop();
  console.log(`${Chalk.bgBlue("How to play")}
    1. Enter your name
    2. Answer the questions correctly
    3. This game ends when you answer a question incorrectly
    `);
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your name",
      default: "Player",
    },
  ]);
  playerName = response.name;
  console.log(`Welcome ${playerName}`);
}

async function question1() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: "What is the capital of Nigeria?",
      choices: ["Lagos", "Abuja", "Kano", "Ibadan"],
    },
  ]);
  return handleAnswer(answers.answer === "Abuja");
}
async function question2() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: "what is my name",
      choices: ["Mohtasham", "Tobi", "Tunde", "Titi"],
    },
  ]);
  return handleAnswer(answers.answer === "Mohtasham");
}

async function handleAnswer(iscorrect) {
  const spinner = createSpinner("Checking answer...");
  spinner.start();
  await sleep(2000);

  if (iscorrect) {
    spinner.success({
      text: `Correct answer! ${playerName} keep going`,
    });
  } else {
    spinner.error({
      text: `Wrong answer! ${playerName} Game over`,
    });
    process.exit(1);
  }
}

await Welcome();
await question1();
await question2();
