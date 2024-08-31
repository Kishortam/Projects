const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path"); // using path we can get access backend directory to express app
const { error, log } = require("console");
const { type } = require("os");
const port = 4000;

//moddleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

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


// Schema creating for user model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating an endpoint for registering the user
app.post('/signup', async(req, res)=>{
    // checking if user is already exists
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success: false, errors:"existing user found with same email id"})
    }

    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    // creating a new user
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save(); // saving a new user

    // creating a token using object
    const data = {
        user:{
            id:user.id
        }
    }

    const token  = jwt.sign(data, 'secret_shop');
    res.json({success:true, token})
})



// creating an endpoint for user login
app.post('/login', async(req, res)=>{
    // password comparing
    let user = await Users.findOne({email:req.body.email});
    if(user){ // if user is not available with email id
        const passCompare = req.body.password === user.password;
        
        if(passCompare){ // if password is correct
          // creating a token using object
          const data = {
            user: {
              id: user.id,
            },
          };

          const token = jwt.sign(data, "secret_shop");
          res.json({ success: true, token });
        }
        else{ // if password is incorrect
            res.json({success:false, errors:"wrong password"});
        }
    }
    else{
        res.json({success:false, errors:"wrong email id"});
    }
})



// creating an endpoint for new collection data
app.get('/newcollections', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8); // it will give us most recently added 8 products as a new collection
    console.log("New Collection fetched");
    res.send(newcollection);
})


// creating an endpoint for popular in women section
app.get('/popularinwomen', async(req, res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})


// creating a middleware to fetch user
const fetchUser = async(req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token, 'secret_shop');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}


// creating an endpoint for adding products in a cartdata
app.post('/addtocart', fetchUser, async(req, res)=>{
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added");
})


// creating an endpoint for remove products from a cartdata
app.post('/removefromcart', fetchUser, async(req, res)=>{
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
})



// creating an endpoint to get cartdata
app.post('/getcart', fetchUser, async(req, res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})



// Port
app.listen(port, (error)=>{
    if(!error){
        console.log("server is running on Port "+ port)
    }
    else{{
        console.log("Error : "+error)
    }}
});