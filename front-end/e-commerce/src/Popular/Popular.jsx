import React from "react";
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'


const Popular = () => {
  return <div className="popular">
    <h1>Popular In Women</h1>
    <hr/>
      <div className="popular-item">
        {data_product.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price}/>
        })}
      </div>
     </div>;
}
export default Popular;
