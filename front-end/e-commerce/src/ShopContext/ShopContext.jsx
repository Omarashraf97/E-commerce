import React ,{createContext, useState} from "react";
import all_product from '../Assets/all_product'

export const ShopContext = createContext()
const getDefaultCart    =()=>{
    let cart = {}
    for (let index=0;index<all_product.length+1;index++)
        cart[index]=0

return cart;
}

const ShopContextProvider = (props) => {
  
    const [CartItems,setCartItems]=useState (getDefaultCart())
    const AddToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    const RemoveFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0 
        for (const item in CartItems){
            if (CartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * CartItems[item]
            }
        }
        return totalAmount
    }
    const getTotalCartItems = () => {
        let totalAmount = 0 
        for (const item in CartItems){
            if (CartItems[item]>0)
            {
                totalAmount += CartItems[item]
            }
        }
        return totalAmount
    }
    const contextvalue = {getTotalCartItems,getTotalCartAmount,all_product,CartItems,AddToCart,RemoveFromCart}
    return (
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider