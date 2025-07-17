const port = 4000;
const express = require ('express');
const app = express();
const cors = require('cors');
const jwt = require ('jsonwebtoken');
const multer = require ('multer');
const mongoose = require ('mongoose');
const path = require ('path');

    app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://omaraamin06:omarashrafamin@cluster0.4t3fjjh.mongodb.net/e-commerce')

app.get('/', (req,res)=>{
    res.send('server is running')
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
        oldPrice:req.body.oldPrice
    });
    
    console.log(product);
    const saved = await product.save();
    console.log(saved);
    res.json({
        success: true,
        product: saved
    });
})

app.post('/removeproduct' , async (req,res)=>{
    const removed = await Product.findOneAndDelete({id:req.body.id});
    console.log(removed);
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
app.listen(port, (err)=>{
    if (!err){
        console.log('server is running on port' +port)
    }
    else{
        console.log('error' +err)
    }
}
)
