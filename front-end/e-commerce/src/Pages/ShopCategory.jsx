
import React, { useContext } from 'react'
import './Css/ShopCategory.css'
import dropdown_icon from '../Assets/dropdown_icon.png'
import {ShopContext} from '../ShopContext/ShopContext'
import Item from '../Item/Item'


const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  return (
    <div className='shop-category'> 
    <img src={props.banner} alt=''/>
    <div className='shopcategory-index'>
      <p>
        <span>Showing 1-12</span> out of 36 Products 
      </p>
      <div className='shopcategory-sort'>
        Sort by <img src={dropdown_icon} alt=''/>
      </div>
    </div>
    <div className='shopcategory-products'>
      {all_product.map((item,i)=>{
        if (props.category === item.category){
          return  <Item key={i} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price}/>
        }
        else{
          return null
        }
      }
      )}
    </div>
      <div className='loadmore'>
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
