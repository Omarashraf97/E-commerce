import React, { useEffect, useState } from 'react'
import './Collection.css'
import Item from '../Item/Item'


const Collection = () => {
  const [new_collection,setNew_collection]=useState([])
useEffect(()=>{
  fetch ('http://localhost:4000/newcollections')
  .then((res)=>res.json())
  .then((data)=>setNew_collection(data))

})

  return (
    <div className='collection' >
      <h1>New Collections</h1>
      <hr/>
      <div className='collection-items'>
        {new_collection.map((item,i)=>{
            return<Item key={i} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice}/>
        })}
      </div>
    </div>
  )
}

export default Collection
