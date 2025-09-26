const fs = require('node:fs')
function generateId(file) {
    const data = getJSON(file);
    let id = 0;
    if (data.length == 0) {
        id = 1;
        return id    
    }
    const lastObject = data.pop();
    id = lastObject.id + 1;
    data.push(lastObject);
    return id;
}

async function add(file,object,element) {
    return new Promise((resolve) => {
        const data = getJSON(file);
        data.push(object);
        fs.writeFile(file,JSON.stringify(data),() => {
            console.log(`${element} added correctly`);
            setTimeout(() => { resolve() }, 2000);
        })
    })
}

function getAll(file){
       
       return rows
}

function get(file,id){
    const data = fs.appendFilesync(file).toString();
    const rows = data.split("\n");
    const cols = lastRow.split(",");
    const matchingID = cols.find(num=>{num == id});

    return id;
}
function getJSON(file){
    const data = JSON.parse(fs.readFileSync(file).toString());
    return data;
}
module.exports = { generateId,add,getAll,getJSON }