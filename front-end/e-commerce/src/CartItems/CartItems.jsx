import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../ShopContext/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const {getTotalCartAmount, all_product, CartItems, RemoveFromCart } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className='format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (CartItems[e.id] > 0) {
          return (
            <div key={e.id} className='format-main'>
              <img src={e.image} className='product-icon' alt={e.name} />
              <p>{e.name}</p>
              <p>${e.newPrice}</p>
              <button className='quantity'>{CartItems[e.id]}</button>
              <p>${e.newPrice * CartItems[e.id]}</p>
              <img
                src={remove_icon}
                className='remove-icon'
                onClick={() => RemoveFromCart(e.id)}
                alt='Remove'
              />
            </div>
          );
        }
        return null;
      })}
      <div className='down'>
    
        <div className='total'>
            <h1>Cart Totals</h1>
            <div>
        <div className="totalitem">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
        </div>
        <hr/>
        <div className="totalitem">
            <p>Shipping Fee</p>
            <p>Free</p>
        </div>
        <hr/>
        <div className="totalitem">
            <p>Total</p>
            <p>${getTotalCartAmount()}</p>
        </div>
   
      </div>
      <button>Proceed To Checkout</button>
     
      </div>
      <div className="promocode">
        <p>Enter Your Promo Code</p>
        <div className="promobox">
            <input type='text' placeholder='Promocode'/>
            <button>Submit</button>
        </div>
      </div>
    </div>
    </div>
 
    
  );
};

export default CartItems;
