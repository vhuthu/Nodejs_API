const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

// get all 
app.get('/products', async(req,res) =>{

    try {
        const product = await Product.find({});
        res.status(200).json(product); 

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get by id
app.get('/products/:id', async(req,res) =>{

    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product); 

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// save data
app.post('/products',async(req,res) => {
    
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update 

app.put('/products/:id', async(req,res) =>{

    try {

        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Sorry seems like the ${id} doesn't exist `})
        }
        res.status(200).json(product); 
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete
app.delete('/products/:id', async(req,res) =>{

    try {

        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Sorry seems like the ${id} doesn't exist `})
        }
        res.status(200).json(product); 
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// connecting data base which is mongoose
mongoose.connect('mongodb+srv://admin:admin123456@simpleapi.kfzzevp.mongodb.net/Node-Api?retryWrites=true&w=majority')
.then(() =>{
    app.listen(3000,()=> {
        console.log(`Server is UP !!! `);
       })
    console.log('connected 2 mongoose DB')
}).catch((error) => {
    console.log(error)
})
