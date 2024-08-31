import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  // fetch data from API
  const fetchInfo = async() =>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=> res.json())
    .then((data)=> {setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  // when clicked on cross icon, product should be remove from list
  const removeProduct = async(id) =>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'appliaction/json',
      },
      body:JSON.stringify({id:id}),
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Product List</h1>

      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="allproducts">
        <hr />
        {allproducts.map((product, index)=>{
          return <>
          <div key={index} className='format-main format'>
            <img src={product.image} alt="" className='product-image'/>
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img src={cross_icon} onClick={()=> {removeProduct(product.id)}} alt="" className='remove-icon' />
          </div>
          
          <hr />
          </>

        })}
      </div>
    </div>
  )
}

export default ListProduct