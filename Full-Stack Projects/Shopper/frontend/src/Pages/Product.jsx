import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrums from '../Components/BreadCrums';
import ProductDisplay from '../Components/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId));

  return (
    <div>
      <BreadCrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product