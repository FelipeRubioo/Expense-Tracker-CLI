const config = require('../Config.js');
const functions = require('../Functions.js')
const categoryList = config.categoryList;
class Category {
    constructor(name){
        this.id = functions.generateId(categoryList)
        this.name = name;
    }
}
module.exports = {Category}