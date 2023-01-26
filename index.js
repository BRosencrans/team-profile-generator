//Functions to call various files
const fs = require('fs')
const inquirer = require('inquirer')
const generateHtml = require('./util/generateHtml.js')
const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const Intern = require('./lib/Intern.js')


const projectGroup = []

const goTime = async () => {
   //asks manager questions and adds to the project team
    const bossAnswers = await bossQuestions()
    const manager = new Manager(bossAnswers.daBoss, bossAnswers.daBossId, bossAnswers.daBossMail, bossAnswers.daBossNumber)
    projectGroup.push(manager)
    newProjectTeam()

}
async function newProjectTeam() {
   // adds either an engineer or intern to the project team 
    const employeeRole = await techAndCoffee()
    if (employeeRole === 'Engineer') {
        const newEmployee = await brainQuestions()
        const engineer = new Engineer(newEmployee.daBrain, newEmployee.daBrainId, newEmployee.daBrainMail, newEmployee.daBrainHub)
        projectGroup.push(engineer)

    } else if 
    (employeeRole === 'Intern') {
            const newEmployee = await coffeeQuestions()
            const intern = new Intern(newEmployee.thatGuy, newEmployee.thatGuysId, newEmployee.thatGuysEmail, newEmployee.thatGuysCollege)
            projectGroup.push(intern)
           
    } else {
        console.log("Have a great day!")
        return
    }
    morePeople()
}

async function bossQuestions() {
    //format for manager questions 
    const bossQs = await inquirer.prompt(
        [{
            type: 'input',
            name: 'daBoss',
            message: "Please enter the project manager's name",

        },
        {
            type: 'number',
            name: 'daBossId',
            message: "Please enter the project manager's employee id",

        },
        {
            type: 'input',
            name: 'daBossMail',
            message: "Please enter the project manager's email address",

        },
        {
            type: 'input',
            name: 'daBossNumber',
            message: "Please enter the project manager's office phone number",
        }]
    )
    return bossQs
}
async function techAndCoffee() {
   //function that determines what questions to ask next based on which type of employee you choose
    const techCoffee = await inquirer.prompt(
        [{
            type: 'list',
            name: 'employeeType',
            message: "Please choose an employee type",
            choices: ['Engineer', 'Intern', 'Quit']
        }]
    )
    return techCoffee.employeeType
}

async function brainQuestions() {
   //format for engineer questions 
    const brainQs = await inquirer.prompt(
        [
            { 
                type: 'input',
                name: 'daBrain',
                message: "Please enter the name of the engineer you'd like to add to the project",

            },
            {
                type: 'number',
                name: 'daBrainId',
                message: "Please enter the engineer's employee id",

            },
            {
                type: 'input',
                name: 'daBrainMail',
                message: "Please enter the engineer's email address",

            },
            {
                type: 'input',
                name: 'daBrainHub',
                message: "Please enter the engineer's Github username",

            },
        ]
    )
    return brainQs
}

async function coffeeQuestions() {
    //format for intern questions 
    const coffeeQs = await inquirer.prompt(
        [
            { 
                type: 'input',
                name: 'thatGuy',
                message: "Please enter the name of the intern you'd like to add to the project",

            },
            {
                type: 'number',
                name: 'thatGuysId',
                message: "Please enter the intern's employee id",

            },
            {
                type: 'input',
                name: 'thatGuysEmail',
                message:"Please enter the intern's email address",

            },
            {
                type: 'input',
                name: 'thatGuysCollege',
                message: "Please enter the name of the school the intern goes to",

            },
        ]
    )
    return coffeeQs
}

async function morePeople() {
    //Asks if you want to add more people to the project and if not it generates an html file
    const addMorePeps = await inquirer.prompt(
        [{
            type: 'list',
            name: 'moreOrGenerate',
            message: "Please add any remaining employee's or generate your HTML page",
            choices: ['Another Person', 'Generate HTML']
        }]
    )
    if (addMorePeps.moreOrGenerate === 'Another Person') {
        newProjectTeam()
    } else if (addMorePeps.moreOrGenerate === 'Generate HTML') {
        const groupHTML = generateHtml(projectGroup)

        fs.writeFile('./output/index.html', groupHTML, err => {
            if (err) { console.log(err) }
        })
    }
}
//starts the fun
goTime()