const fs = require('node:fs');


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

function getJSON(file){
    const data = JSON.parse(fs.readFileSync(file).toString());
    return data;
}

async function showAll(rl,message,options=[],properties=[],file=""){
    console.clear();
    return new Promise((resolve)=>{
            rl.question(`${message}\n${options.length > 0 ? "\n"+ options.map(object=>{return getProperties(object,properties,file)}).join("\n")+"\n":""}`,
                (answer)=>{resolve(answer)
            })
        })
}
function getProperties(object,properties,file=""){
    let objProperties = "";
    for (let i = 0; i < properties.length; i++) {
        if (properties[i] == "idcategory") {
            let catName = getJSON(file).find(cat =>cat.id == object[properties[i]])["name"];
            objProperties += catName+"\t";    
        }else{
            objProperties += object[properties[i]]+"\t";
        }  
    }
    return objProperties
}

function update(rl,file,fileCat,id,element){
    console.clear();

    return new Promise((resolve)=>{
        const data = getJSON(file);
        let found = data.find(object =>object.id == id);
        let properties = []
        element == "expense"?properties=["name","desc","idcategory","amount"]:properties=["name"]
        console.log("Select a property to change:\n")
        counter = 1;
        properties.forEach(property => {console.log(`${counter}.${property} (currently ${property=="idcategory"?getJSON(fileCat).find(object =>object.id == found["idcategory"])["name"]:found[property]})\n`);counter++});
        rl.question(``,(num)=>{
            console.clear();
            property = properties[num-1];
            property == "idcategory"?showAll(rl,"Select a category(number) for the new expense",getJSON(fileCat),["id","name"]).then((val)=>{updateVal(val)}): rl.question(`Write the value of the new ${property}\n`,(val)=>{updateVal(val)});


            function updateVal(val){
                data.find(object =>object.id == id)[property] = val;
                fs.writeFile(file,JSON.stringify(data),() => {
                console.log(`${element} updated correctly`);
                setTimeout(() => { resolve() }, 2000);
                })   
            }
        });
    })
}
module.exports = {generateId,add,getJSON,getProperties,update,showAll}