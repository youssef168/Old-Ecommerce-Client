import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div className="inner-container" key={product._id.toString()}>
        <Link to={`/product/${product._id}`} target="_blank">
            <div className="head-img">
                <img src={`http://localhost:8000${product.product_img}`} alt="asd" />
            </div>
        </Link>
        <div className="cat-rate">
            <h4>{ product.category }</h4>
        <div className='rate'>
            <h5>{ product.rating }</h5> <FontAwesomeIcon icon={faStar} className='rate-icon'/>
        </div>
        </div>
        <div className='details'>
            <h3>{ product.product_name }</h3>
            <h4>${ product.price }</h4>
        </div>
    </div>
  )
}

export default Product