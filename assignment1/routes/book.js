const express=require("express")
const router=express.Router()
const bookController=require("../controllers/book")

router.get("/",bookController.getbooks)

router.post("/",bookController.postbooks)


module.exports=router