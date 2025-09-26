const config = require('../Config.js');
const functions = require('../Functions.js')
const expensesList = config.expensesList;

class Expense {
    constructor(name, desc, idcategory, amount) {
        this.id = functions.generateId(expensesList);
        this.name = name;
        this.desc = desc
        this.idcategory = idcategory;
        this.amount = amount;
        const today = new Date();
        const day = today.getDate().toString();
        const month = (today.getMonth()+1).toString();
        const year = today.getFullYear().toString();
        this.date = `${day}/${month}/${year}`;
    }
}
module.exports = {Expense}

