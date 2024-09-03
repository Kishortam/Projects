import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'
import logo from '../Components/Assets/logo.png'
import cart_icon from '../Components/Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import nav_dropdown from '../Components/Assets/nav_dropdown.png'


const Navbar = () => {

const [menu, setMenu] = useState('shop');
const {getTotalCartItems} = useContext(ShopContext);
const menuRef = useRef();

const dropdown_toggle = (e) =>{
  menuRef.current.classList.toggle('nav-menu-visible');
  e.target.classList.toggle('open');
}

  return (
    <div className='navbar'>
         <div className="nav-logo">
            <img src={logo} alt="" />
            <Link to={"/"}><p>SHOPPER</p></Link>
        </div>

        {/* when screen is smaller size only menu icon will show, not a list of menu, to open menu list click on arrow icon */}
        {/* when we click on this img, it will add open class on this image, again click will remove open class */}
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" /> 
        <ul ref={menuRef} className="nav-menu">
            {/* if one of the menu is clicked it should be highlighted, if menu is equal to 'xyz' then show </hr> else empty tag
            wrap the titles wit Link tag to navigate them */}
            
            <li onClick={() =>{setMenu("shop")}}> <Link style={{textDecoration: 'none'}} to='/'> Shop</Link>  {menu === 'shop' ? <hr/> : <></>} </li>
            <li onClick={() =>{setMenu("men")}}> <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>  {menu === 'men' ? <hr/> : <></>} </li>
            <li onClick={() =>{setMenu("women")}}> <Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>  {menu === 'women' ? <hr/> : <></>} </li>
            <li onClick={() =>{setMenu("kids")}}> <Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu === 'kids' ? <hr/> : <></>} </li>
        </ul>
        <div className="nav-login-cart">
          {/* if auth token is available in local storage, show logout button else show login button */}
          {localStorage.getItem('auth-token')
          ? <button onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
          : <Link to='/login'><button>Login</button></Link>}
            
            <Link to='/cart'><img src={cart_icon}  alt="" /></Link>
            <p className='nav-cart-count'>{getTotalCartItems()}</p>
        </div>
    </div>
  )
}

export default Navbar