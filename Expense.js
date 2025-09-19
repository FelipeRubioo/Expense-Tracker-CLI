const fs = require('node:fs');

class Expense {
    constructor(name, desc, category, amount) {
        this.name = name;
        this.desc = desc
        this.category = category;
        this.amount = amount;
        //id
        let num = 1
        this.id = num.toString();
        //date
        this.date = new Date().toString();
    }

    add() {
        //if file doesn´t exist, create it
        try {
            if (!fs.existsSync("./ExpensesList.csv")) {
                fs.writeFile("./ExpensesList.csv",`${this.id},${this.name},${this.desc},${this.category},${this.amount},${this.date}\n`, () => {
                    console.log("File has been created and Expense added");
                    return
                });
            }
            fs.appendFileSync("./ExpensesList.csv",`${this.id},${this.name},${this.desc},${this.category},${this.amount},${this.date}\n`)
                console.log("Expense added Correctly");
                return
        } catch (error) {
            console.error(error)
        }

    }
}

module.exports = {Expense}

