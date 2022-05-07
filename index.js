const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const resolve = require("./lib/htmlRenderer");

// Name, number and email

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

function teamMember() {
  // questions for manager

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

  // Here you add engineer or intern if neccesary

  async function chooseMemberNext() {
    try {
      let teamChoice = await inquirer.prompt([
        {
          type: "list",
          name: "team",
          message: "Which type of team member would you like to add",
          choices: ["Engineer", "Intern", "No more team members."],
        },
      ]);

      if (teamChoice.team === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Engineer's name?",
              name: "name",
              validate: confirmName,
            },
            {
              type: "input",
              message: "What is your Engineer's id?",
              name: "id",
              validate: confirmNumber,
            },
            {
              type: "input",
              message: "What is your engineer's email?",
              name: "email",
              validate: validateEmail,
            },
            {
              type: "input",
              message: "What is your engineer's GitHub username?",
              name: "github",
              validate: confirmName,
            },
          ])

          .then(function (answers) {
            let engineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            );
            engagementTeam.push(engineer);
            chooseMemberNext();
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (teamChoice.team === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your intern's name?",
              name: "name",
              validate: confirmName,
            },
            {
              type: "input",
              message: "What is your intern's id?",
              name: "id",
              validate: confirmNumber,
            },
            {
              type: "input",
              message: "What is your intern's email?",
              name: "email",
              validate: validateEmail,
            },
            {
              type: "input",
              message: "What is your intern's school?",
              name: "school",
              validate: confirmName,
            },
          ])
          .then(function (answers) {
            let intern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.school
            );
            engagementTeam.push(intern);
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

function generateFile() {
  fs.writeFileSync(distPath, resolve(engagementTeam), "utf-8");
}
