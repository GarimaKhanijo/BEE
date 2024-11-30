const mongoose=require("mongoose")
const { type } = require("os")

const movieSchema=new mongoose.Schema({
    Title:{type:String , required:true},
    Director:{type:String , required:true},
    Genre:{type:String , required:false},
    Release_Year:{type:Number , required:false},
    Rating:{type: Number , required:false},
    Poster_Url:{type:String , required:false},
    Description:{type:String , required:false}
})

module.exports=mongoose.model("Movie",movieSchema)