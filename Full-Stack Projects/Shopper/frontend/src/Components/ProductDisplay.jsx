import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Components/Assets/star_icon.png';
import star_dull_icon from '../Components/Assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productdisplay'>
        <div className="left">
            <div className="img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="img">
                <img className='main-img' src={product.img} alt="" />
            </div>
        </div>

        <div className="right">
            <h1>{product.name}</h1>
            <div className="stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="prices">
                <div className="right-price-old">${product.old_price}</div>
                <div className="right-price-new">${product.new_price}</div>
            </div>
            <div className="description">
                A lightweight, usually knitted, pullover shirt, close fitting and a round neckline and short sleeves.
            </div>
            <div className="size">
                <h1>Select Size</h1>
                <div className="sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            
            <button onClick={()=> addToCart(product.id)}>Add to Cart</button>

            <p className='category'> <span>Category:</span>Women, T-Shirt, Crop Top</p>
            <p className='category'> <span>Tags:</span>Modern, latest</p>

        </div>
    </div>
  )
}

export default ProductDisplay