import React from 'react'
import './Collection.css'
import Item from '../Item/Item'
import new_collection from '../Assets/new_collections'

const Collection = () => {
  return (
    <div className='collection' >
      <h1>New Collections</h1>
      <hr/>
      <div className='collection-items'>
        {new_collection.map((item,i)=>{
            return<Item key={i} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price}/>
        })}
      </div>
    </div>
  )
}

export default Collection
