import React ,{createContext, useEffect, useState} from "react";



export const ShopContext = createContext()
const getDefaultCart    =()=>{
    let cart = {}
    for (let index=0;index<300+1;index++){
        cart[index]=0
    }

return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product]=useState([]);
    const [CartItems,setCartItems]=useState (getDefaultCart())
  
  
useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))
        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:'',

            }).then((res)=>res.json())
            .then(data=>setCartItems(data))
        }

    },[])

    const AddToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
        
    }
    const RemoveFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeformcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemId':itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        
        }
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