const readline = require('node:readline');
const expenseImports = require('./Expense.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function run() {
    console.clear()
    rl.question("Select an option(number):\n1.Add a new Expense\n", (choice) => {
    switch (choice) {
        case "1":
            addExpense().then((array)=>{
                let expense = new expenseImports.Expense(array['expName'],array['expDesc'],array['expCat'], array['expAmount'])
                 expense.add()
                 run()
            })
            break;

        default:
            rl.close();
            break;
    }
})
}

async function askUser(question) {
    return new Promise((resolve)=>{
        rl.question(question+"\n",(answer)=>{
            resolve(answer)
        })
    })
}
async function addExpense() {

    let expName = await askUser("Write the name of the new expense");
    let expDesc = await askUser("Write a description for the new expense");
    let expCat = await askUser("Write a category for the new expense");
    let expAmount = await askUser("Write the amount($) of the new expense");
    return { 'expName': expName, 'expDesc': expDesc, 'expCat': expCat, 'expAmount': expAmount }
}


run()