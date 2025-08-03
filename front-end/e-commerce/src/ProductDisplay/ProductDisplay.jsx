import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../ShopContext/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props
    const { AddToCart } = useContext(ShopContext)

    return (
        <div className='productdisplay'>
            <div className='left'>
                <div className='imglist'>
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                </div>
                <div className='image'>
                    <img className='img' src={product.image} alt=''/>
                </div>
            </div>

            <div className='right'>
                <h1>{product.name}</h1>
                <div className='rightstar'>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_dull_icon} alt=''/>
                    <p>(122)</p>
                </div>
                <div className='prices'>
                    <div className='old'>${product.oldPrice}</div>
                    <div className='new'>${product.newPrice}</div>
                </div>
                <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam et voluptas non numquam voluptatum accusamus a! Facere assumenda magni nulla quisquam, numquam mollitia suscipit veniam esse sint culpa. Cupiditate, exercitationem!
                </div>
                <div className='size'>
                    <h1>Select Size</h1>
                    <div className='size'>
                        <p>S</p>
                        <p>M</p>
                        <p>L</p>
                        <p>XL</p>
                        <p>XXL</p>
                        <button onClick={() => AddToCart(product.id)}>Add To Cart</button>
                        <p className='classification'><span>Category : </span>Women,T-sirt,Crop</p>
                        <p className='classification'><span>Tags :</span>Modern,Latest</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
