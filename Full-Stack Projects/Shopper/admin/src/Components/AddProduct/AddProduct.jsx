import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })


  // to show uploaded img on upload icon
  const imageHandler = (e) =>{
    setImage(e.target.files[0]);
  }

  // to handle product details entered in input fields
  const changeHandler = (e) =>{
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  // when clicked on add button, add product to mongoDB database
  const add_product = async()=>{
    console.log(productDetails)
    let responseData;
    
    let product = productDetails;

    let formData = new formData();
    formData.append('product', image)

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'Application/json',
      },
      body:formData,
    })
    .then((res)=> res.json())
    .then((data)=>{responseData = data});

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type':'appliaction/json',
        },
        body:JSON.stringify(product),
      })
      .then((resp)=> resp.json())
      .then((data)=> {data.success ? alert("Product Added"): alert("Failed")})
    }
  }
  

  return (
    <div className='add-product'>
      <div className="itemfield">
        <p>Product Title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here'/>
      </div>

      <div className="price">
      <div className="itemfield">
        <p>Price</p>
        <input type="text" name='old_price' value={productDetails.old_price} onChange={changeHandler} placeholder='Type here'/>
      </div>

      <div className="itemfield">
        <p>Offer Price</p>
        <input type="text" name='new_price' value={productDetails.new_price} onChange={changeHandler} placeholder='Type here'/>
      </div>
      </div>

      <div className="itemfield">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={changeHandler} className='selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="itemfield">
        <label htmlFor="file-input">
          {/* if image is selected and uploaded show it on upload area, else show upload icon */}
          <img src={image ? URL.createObjectURL(image): upload_area} alt="" className='thumbnail-img' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>

      <button className='btn' onClick={() => {add_product()}}>ADD</button>
      </div>
  )
}

export default AddProduct