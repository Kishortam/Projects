const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path"); // using path we can get access backend directory to express app
const { error, log } = require("console");
const port = 4000;

//moddleware
app.use(express.urlencoded({extended: true}));
// app.use(multer.json());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://kishortam:5C4fPEnZSbF9b5gd@cluster0.zpjo4.mongodb.net/shopper")
// now mongoDB is connected with express


// API creation

app.get("/", (req, res)=>{
    res.send("Express app is running");
})


// Image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload endpoint for images

app.use('/images', express.static('upload/images'))  // static endpoint

app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success: 1, // upload a image with success msg 1
        image_url: `http://localhost:${port}/images/${req.file.filename}` // using this url we can access this image
    })
})



// Schema for creating products

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
       type: String,
       required:true, 
    },
    image:{
        type: String,
        required: true,
    },
    category:{
       type: String,
       required:true, 
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
       type: Number,
       required:true, 
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
       type: Boolean,
       default:true, 
    }
})


// API for adding product
app.post('/addproduct', async(req, res)=>{
    // automatic id creation in increasing order
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1; // whatever was last id of product, we will increase next product id by 1
    }
    else{
        id=1;
    }

    const product = new Product({
        id: id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save(); // automatically save product in the mongoDB
    console.log("saved");
    res.json({
        success: true,
        name:req.body.name,
    })  
})



// Creating API for Deleting Products
app.post('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({ // response for frontend
        success: true,
        name: req.body.name
    })
})

// creating API for getting all products
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})



app.listen(port, (error)=>{
    if(!error){
        console.log("server is running on Port "+ port)
    }
    else{{
        console.log("Error : "+error)
    }}
})