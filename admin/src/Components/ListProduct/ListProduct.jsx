import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts,setAllProducts] = useState ([])

  const fetchInfo = async () =>{
    await fetch ('http://localhost:4000/allproducts')
      .then((res)=>res.json()).then((data)=>{setAllProducts(data)})
    }

    const remove_product = async (id) => {
      await fetch ('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo()
    }
    useEffect(()=>{
      fetchInfo()
    },[])
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
      <p>Products</p>
      <p>Title</p>
      <p>Old Price</p>
      <p>New Price</p>
      <p>Category</p>
      <p>Remove</p>
      </div>
      <div className='listproducct-allproducts'>
      <hr/>
      {allproducts.map((product,index)=>{
        return <><div key={index} className='listproduct-format'>
            <img src={product.image} alt='' className='listproduct-image'/>
            <p>{product.name}</p>
            <p>${product.oldPrice}</p>
            <p>${product.newPrice}</p>
            <p>{product.category}</p>
            <img className='listproduct-remove-icon' onClick={()=>{remove_product(product.id)}} src={cross_icon} alt=''/>
          </div>
          <hr/>
          </> 
      })}
      </div>
    </div>
  )
}

export default ListProduct
