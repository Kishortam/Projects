import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';

const ProductDisplay = (props) => {
    const {product} = props;
  return (
    <div className='productdisplay'>
        <div className="left">
            <div className="img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
            <img className='main-image' src={product.image} alt="" />
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
            <div className="right-description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam optio nulla sit fugit itaque odit amet, animi doloribus omnis ab tenetur quod ducimus expedita impedit.
            </div>
            <div className="size">
                <h1>Select Size</h1>
                <div className='sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>

            <button>Add to Cart</button>
        </div>

    </div>
  )
}

export default ProductDisplay