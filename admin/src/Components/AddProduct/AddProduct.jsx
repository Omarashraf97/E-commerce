import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'


const AddProduct = () => {

  const [image,setImage]=useState(false)
  const [productDetails,setProductDetails]=useState({
    name:'',
    image :'',
    category :'',
    newPrice :'',
    oldPrice :''
 })

 const imageHandler = (e) => {
  setImage(e.target.files[0])
 }
 const changeHandler = (e)=>{
  setProductDetails({...productDetails,[e.target.name]:e.target.value})
 }

 const Add_Product = async ()=>{
  console.log(productDetails)
  let responseData;
  let product=productDetails;
  let formData = new FormData()
  formData.append('product', image)

  await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers:{
      Accept:'application/json'
    },
    body:formData,
  }).then((res)=>res.json()).then((data)=>{responseData=data})

  if(responseData.success){
    product.image=responseData.image_url
    product.newPrice = Number(product.newPrice);
product.oldPrice = Number(product.oldPrice);
    console.log(product);
    await fetch('http://localhost:4000/addproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(product),
    }).then((res)=>res.json()).then((data)=>{
      data.success?alert('Product Added'):alert ('Failed')
    })
    
  }


}
  return (
    <div className='add-product'>
      <div className='addproduct-item'>
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='type your username'/>
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-item'>
          <p>Price</p>
          <input type='text' value={productDetails.oldPrice} onChange={changeHandler} name='oldPrice' placeholder='type here'/>
        </div>
        <div className='addproduct-item'>
          <p>Offer Price</p>
          <input type='text' value={productDetails.newPrice} onChange={changeHandler} name='newPrice' placeholder='type here'/>
        </div>
      </div>
      <div className='addproduct-item'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='select'>
          <option value='women'>Women </option>
          <option value='men'>Men </option>
          <option value='kid'>Kid </option>
        </select>
      </div>
      <div className="addproduct-item">
        <label htmlFor='input'>
          <img src={image?URL.createObjectURL(image):upload_area} alt=''/>
        </label>
        <input type='file' onChange={imageHandler} name='image' id='input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='btn'>ADD</button>
    </div>
  )
}

export default AddProduct
