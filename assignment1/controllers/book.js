const fs = require("fs")
const path=require("path")
const {v4:uuidv4}=require("uuid")
const dataPath=path.join(__dirname,"../db.json")

const readfromfile=()=>{
    try{
        const data=fs.readFileSync(dataPath,"utf8")
        return data
    }
    catch(err){
        console.log(err)
    }
}

module.exports.getbooks=(req,res)=>{
    const bookdata=readfromfile()
    console.log(bookdata)
    res.status(200).send(bookdata)
}

module.exports.postbooks=(req,res)=>{
    const {Title,Author,Genre,PublicationYear, ImageURL,ISBN,description}=req.body
    if(!Author || !Title){
        res.send("Please enter Book title or Author name")
    }
    else{
        const data=JSON.parse(readfromfile())
        data.push({
                id : uuidv4(),
                Title,
                Author,
                Genre,
                PublicationYear, 
                ImageURL,
                ISBN,
                description
        })
        fs.writeFileSync(dataPath, JSON.stringify(data));
        res.send("Success")
    }
}