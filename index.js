const Manager = require("./html/manager");
const Employee = require("./html/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const engagementTeam = [];

const confirmName = async (name) => {
  if (name === "") {
    return "Incorrect answer";
  }
  return true;
};

const confirmNumber = async (name) => {
  if (name === "") {
    return "Incorrect answer";
  }
  return true;
};

function validateEmail(name) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name)) {
    return true;
  }
  return "You have entered an invalid email address!";
}

//Write out validations; check out link about NaN; find out substitutes to check number validation; chain validations on first prompt

function teamMember() {
  // Ask questions to gather information about manager. Save to an manager object.

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
        validate: confirmName,
      },
      {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
        validate: confirmNumber,
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
        validate: validateEmail,
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
        validate: confirmNumber,
      },
    ])

    .then(function (answers) {
      let manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      engagementTeam.push(manager);
      chooseMemberNext();
    })
    .catch(function (err) {
      console.log(err);
    });

  // Lead or supervisor.

  async function chooseMemberNext() {
    try {
      let teamChoice = await inquirer.prompt([
        {
          type: "list",
          name: "team",
          message: "Which type of team member would you like to add",
          choices: [
            "lead",
            "supervisor",
            "I don/t want to add anymore team members.",
          ],
        },
      ]);

      // Depending on the response, loop through questions to gather information and save to appropriate object
      if (teamChoice.team === "lead") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your leads name?",
              name: "name",
              validate: confirmName,
            },
            {
              type: "input",
              message: "What is your leads id?",
              name: "id",
              validate: confirmNumber,
            },
            {
              type: "input",
              message: "What is your leads email?",
              name: "email",
              validate: validateEmail,
            },
          ])

          .then(function (answers) {
            let lead = new Lead(answers.name, answers.id, answers.email);
            engagementTeam.push(lead);
            chooseMemberNext();
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (teamChoice.team === "supervisor") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your supervisor's name?",
              name: "name",
              validate: confirmName,
            },
            {
              type: "input",
              message: "What is your supervisors id?",
              name: "id",
              validate: confirmNumber,
            },
            {
              type: "input",
              message: "What is your supervisors email?",
              name: "email",
              validate: validateEmail,
            },
          ])
          .then(function (answers) {
            let Supervisor = new Supervisor(
              answers.name,
              answers.id,
              answers.email
            );
            engagementTeam.push(supervisor);
            chooseMemberNext();
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        generateFile();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

teamMember();

//Call the function

function generateFile() {
  fs.writeFileSync(outputPath, render(engagementTeam), "utf-8");
}
