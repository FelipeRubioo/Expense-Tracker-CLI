const readline = require('node:readline');
const fs = require('node:fs');
const configImports = require('./Config.js');
const expenseImports = require('./classes/Expense.js');
const categoryImports = require('./classes/Category.js');
const functions = require('./Functions.js');
const expensesList = configImports.expensesList;
const categoryList = configImports.categoryList;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data')
    }else{
        if (!fs.existsSync(expensesList)) {
        fs.writeFile(expensesList,"[]",()=>{})   
        }
        if(!fs.existsSync(categoryList)){
        fs.writeFile(categoryList,"[]",()=>{})
        }
    }
    console.clear()
    rl.question("Select an option(number):\n1.Manage Expenses\n2.Manage categories\n5.end program\n", (choice) => {
        console.clear();
    switch (choice) {
        case "1":
            rl.question("Select an option (number):\n1.Add a new expense\n2.Show all expenses\n3.Update an expense\n4.Delete an expense\n5.Return to menu\n",(choice)=>{
                switch (choice) {
                    case "1":
                        addExpense();
                        break;
                    case "2":
                        functions.showAll(rl,"Enter any value to return to menu",functions.getJSON(expensesList),["id","name","desc","idcategory","amount"],categoryList).then(()=>{run()});
                        break;
                    case "3":
                        functions.showAll(rl,"Select an expense to update",functions.getJSON(expensesList),["id","name","desc","amount"]).then((id)=>{functions.update(rl,expensesList,categoryList,Number(id),"expense").then(()=>{run()})});
                        break;
                    case "4":
                        functions.showAll(rl,"Select an expense to delete",functions.getJSON(expensesList),["id","name","desc","idcategory","amount"],categoryList).then((id)=>{functions.deleteObj(expensesList,Number(id),"expense").then(()=>{run()})});
                        break;
                    case "5":
                        run();
                    default:
                        break;
                }
            })
            break;
        case "2":
            rl.question("Select an option (number):\n1.Add a new category\n2.Show all categories\n3.Update a category\n4.Delete a category\n5.Return to menu\n",(choice)=>{
                console.clear()
                switch (choice) {
                    case "1":
                        addCategory();
                        break;
                    case "2":
                        functions.showAll(rl,"Enter any value to return to menu",functions.getJSON(categoryList),["id","name"]).then(()=>{run()});
                        break;
                    case "3":
                        functions.showAll(rl,"Select a category to update",functions.getJSON(categoryList),["id","name"]).then((id)=>{functions.update(rl,categoryList,categoryList,Number(id),"category").then(()=>{run()})});
                        break;
                    case "4":
                        functions.showAll(rl,"Select a category to delete",functions.getJSON(categoryList),["id","name"],categoryList).then((id)=>{functions.deleteObj(categoryList,Number(id),"category").then(()=>{run()})});
                        break;
                    case "5":
                        run();
                    default:
                        break;
                }
            })
            break;
        case "5":
            rl.close();
            process.exit();
            break;
            
        default:
            run();
            break;
    }
})
}

async function askUser(question) {
    console.clear();
    return new Promise((resolve)=>{
        rl.question(question+"\n",(answer)=>{resolve(answer)})
    })
}
async function addExpense() {
    console.clear();
    let expName = await askUser("Write the name of the new expense");
    let expDesc = await askUser("Write a description for the new expense");
    let expCat = await functions.showAll(rl,"select a category(number) for the new expense",functions.getJSON(categoryList),["id","name"]);
    let expAmount = await askUser("Write the amount($) of the new expense");
    let expense = new expenseImports.Expense(expName,expDesc,expCat,expAmount);
    functions.add(expensesList,expense,"Expense")
    .then(()=>{run()})
    .catch((err)=>{console.log(err)})
}

async function addCategory(){
    let catName = await askUser("Write the name for the new category");
    let category = new categoryImports.Category(catName);
    functions.add(categoryList,category,"Category")
    .then(()=>{run()})
    .catch((err)=>{console.log(err)})
}

run()