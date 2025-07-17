import React , {useContext} from 'react'
import {ShopContext} from '../ShopContext/ShopContext.jsx'
import {useParams} from 'react-router-dom'
import Breadcrum from '../Breadcrum/Breadcrum'
import ProductDisplay from '../ProductDisplay/ProductDisplay.jsx'
import RelatedProducts from '../RelatedProducts/RelatedProducts.jsx'

 const Product = () => {
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams()
    const product = all_product.find((e)=>e.id=== Number(productId))
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
