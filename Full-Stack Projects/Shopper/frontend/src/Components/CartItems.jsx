import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../Components/Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e, i) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="format format-main">
                <img src={e.image} alt="" className="product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='remove-icon' src={remove_icon} onClick={() => {removeFromCart(e.id)}} alt=""/>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="total">
          <h1>Cart Total</h1>
          <div>
            <div className="total-item">
              <p>Sub-Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button>Proceed to Checkout</button>
        </div>
        <div className="promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="promobox">
            <input type="text" placeholder='enter promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems