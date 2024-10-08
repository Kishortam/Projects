import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);

// cart function
const getDefaultCart = () =>{
    let cart = {};
    for(let index = 0; index < 300+1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{

    const[all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{ // fetching all products from backend
        fetch('http://localhost:4000/allproducts')
        .then((respnose)=> respnose.json())
        .then((data)=> setAllProduct(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((res)=> res.json())
            .then((data)=> setCartItems(data))
        }
    },[])
    

    // add in cart function
    const addToCart = (itemId) =>{
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=> res.json())
            .then((data)=> console.log(data))
        }
    }

    // remove from cart function
    const removeFromCart = (itemId) =>{
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=> res.json())
            .then((data)=> console.log(data))
        }
    }


    // 
    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=> product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
            return totalAmount;
        }
    }

    // // to count cart items and show it on cart
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
//  