const express = require('express')
const app = express()
const mongoose = require('mongoose')
const uri = "mongodb+srv://root:system@node-api.hzzmxs6.mongodb.net/?retryWrites=true&w=majority";
const port = 8080
const Weather=require('./models/productModel') 
const cors=require('cors');
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello anna!')
})

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });

  app.post('/weather',async (req,res)=>{
    try{
        const weather=await Weather.create(req.body);
        res.send(weather);
    }
    catch(err){
        console.error(err);
    }
  })

mongoose.connect(uri).then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
})
console.log('mongodb connected');

}).catch((error)=>console.error(error))