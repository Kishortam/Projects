import React from 'react'
import './BreadCrums.css'
import arrow_icon from '../Components/Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {

    const {product} = props;

  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} /> SHOP <img src={arrow_icon}/> {product.category}<img src={arrow_icon}/> {product.name}<img src={arrow_icon}/>
    </div>
  )
}

export default Breadcrums