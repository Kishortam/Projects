import React, { useEffect, useState } from 'react'
import './Popular.css'
import Items from './Items'

const Popular = () => {

  const[popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{ // to fetch from backend
    fetch('http://localhost:4000/popularinwomen')
    .then((res) => res.json())
    .then((data)=> setPopularProducts(data))
  },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item, i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular