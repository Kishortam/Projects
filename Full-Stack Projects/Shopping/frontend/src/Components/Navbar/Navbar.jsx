import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, Links } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'



const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>ShopIt</p>
        </div>
        <ul className="nav-menu">
            {/* if we click on a particular menu, the colored line will appear on bottom of it */}
            {/* once, routing and linkig done, check clicking on menu if url/route name changes as per menu */}
            <li onClick={()=>{setMenu("shop")}}>   <Link to={'/'}>Shop</Link>        {menu === "shop" ? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu("mens")}}>   <Link to={'/mens'}>Men</Link>     {menu === "mens" ? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu("womens")}}> <Link to={'/womens'}>Women</Link> {menu === "womens" ? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu("kids")}}>   <Link to={'/kids'}>Kids</Link>    {menu === "kids" ? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar