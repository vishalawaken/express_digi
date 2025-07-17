import express from "express";

const app = express()

const port = 3000;

app.use(express.json())

let teaData=[]

let nextId = 1


// Add a new Tea
app.post('/teas', (req,res)=>{
   const {name,price} = req.body
   const newTea = {id:nextId++,name,price}
   teaData.push(newTea)
   res.status(201).send(newTea)
})

// Route to get all tea
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})


// Get a tea with id 
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea is not present")
    }
    res.status(200).send(tea)
})

// UPDATE TEA 
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find((t)=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea is not present")
    }
    const {name,price}=req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.listen(port,()=>{
    console.log(`Server is running at port : ${port}...`)
})