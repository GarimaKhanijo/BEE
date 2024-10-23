const express=require("express")
const app=express()
const PORT=8080

app.use(express.json())

const bookHandler=require("./routes/book")
app.use("/books",bookHandler)


app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening on PORT ${PORT}`)
    }
})

