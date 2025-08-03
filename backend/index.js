const port = 4000;
const express = require ('express');
const app = express();
const cors = require('cors');
const jwt = require ('jsonwebtoken');
const multer = require ('multer');
const mongoose = require ('mongoose');
const path = require ('path');

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token" });
    }
};

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://omaraamin06:omarashrafamin@cluster0.4t3fjjh.mongodb.net/e-commerce')

app.get('/', (req,res)=>{
    res.send('Express App is running')
})

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})



const upload = multer({storage:storage})
app.use('/images', express.static('upload/images'));
app.post('/upload',upload.single('product'),(req,res)=>{
 
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    oldPrice:{
        type:Number,
        required:true,
    },
    newPrice:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }

})
app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if (products.length>0){
        let lastProduct_array = products.slice(-1);
        let lastProduct = lastProduct_array[0];
        id=lastProduct.id+1;
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        newPrice:req.body.newPrice,
        oldPrice:req.body.oldPrice,
    });
    
    console.log(product);
    await product.save();
    console.log('saved');
    res.json({
        success: true,
        name:req.body.name,
    });
})

app.post('/removeproduct' , async (req,res)=>{
   await Product.findOneAndDelete({id:req.body.id});
    console.log('removed');
    res.json({
        success:true,
        name:req.body.name
    })

})

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log('all products fetched');
    res.send(products);
    
})

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

app.post('/signup' , async (req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if (check){
        return res.status(400).json({success:false , errors:'existing email'})
    }
    let cart = {}
    for (let i = 0; i<300; i++)
        cart[i]=0

const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
})

await user.save()
const data = {
    user:{
        id:user._id
    }
}
const token = jwt.sign(data , 'secret_ecom')
res.json({success:true,token})
})

app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if (user){
        const passcompare = req.body.password == user.password
        if (passcompare){
            const data = {
                user:{
                    id:user._id
                }
            }
            const token = jwt.sign(data , 'secret_ecom')
            res.json({success:true,token})
        }else{
            res.json({success:false,errors:'wrong password'})
        }
    }
    else{
        res.json({success:false, errors:'wrong email'})
    }
})

app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log('New Collection Fetched');
    res.send(newcollection)
    })

app.get('/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:'women'})
    let popular_in_women = products.slice(0,4)
    console.log('Popular in women fetched');
    res.send(popular_in_women)
})


app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log('added',req.body.itemId);
    let userData = await Users.findOne ({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData})
    res.send('Added')
})

app.post('/removeformcart',fetchUser,async (req,res)=>{
    console.log('removed',req.body.itemId);
    let userData = await Users.findOne ({_id:req.user.id})
    if (userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData})
    res.send('removed')
})



app.post('/getcart', fetchUser,async (req,res)=>{
    console.log('Getcart');
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

app.listen(port, (err)=>{
    if (!err){
        console.log('server is running on port'  +port)
    }
    else{
        console.log('error' +err)
    }
}
)
