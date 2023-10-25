const mongoose = require('mongoose');
const dotenv = require("dotenv");
const recipe = require('../models/recipeModel')
dotenv.config({path: "./config.env"});
const fs = require("fs");
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then(() => {
    console.log("connected")
})

const data = JSON.parse(fs.readFileSync(`${__dirname}/dev-data.json`, 'utf-8'));
const upload = async  ()=> {
    try {
        await recipe.create(data)
        console.log("upload")
    }catch(e){
        console.log(e)
    }
    process.exit();
}
const deleteItems = async () =>{
    try {
        await recipe.deleteMany()
        console.log("delete")
    } catch(e){
        console.log(e)
    }
    process.exit();
}
if(process.argv[2] === "--delete"){
    deleteItems()
}
if(process.argv[2] === "--import"){
    upload()
}
