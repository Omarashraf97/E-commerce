import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
     <h1>Related Products</h1> 
     <hr/>
     <div className='items'>
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price}/>
        })}
     </div>
    </div>
  )
}

export default RelatedProducts
