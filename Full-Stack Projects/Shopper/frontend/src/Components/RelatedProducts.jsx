import React from 'react'
import './RelatedProducts.css'
import data_product from '../Components/Assets/data'
import Items from './Items'

const RelatedProducts = () => {
  return (
    <div className='related-products'>
        <h1>Related Products</h1>
        <hr />
        <div className="items">
            {data_product.map((item, i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts