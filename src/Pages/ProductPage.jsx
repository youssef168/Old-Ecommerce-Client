import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpecifiecProd, createProductReview } from '../State/Actions/ProductAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMoneyCheckDollar, faArrowRotateLeft, faCertificate, faStore, faTruckFast, faUserShield } from '@fortawesome/free-solid-svg-icons';
import Warning from '../Components/Warning';
import { PRODUCT_CREATE_REVIEW_RESET } from '../State/Actions-types/ProductTypes';
import Navbar from '../Components/Navbar'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Error from '../Components/Error'
import Success from '../Components/Success'


const ProductPage = () => {
    const [reviews, setReviews] = useState()
    // For Product Rating
    const [rating, setRating] = useState()
    // For Product Message
    const [description, setMessage] = useState()
    // For Product Qty
    const [qty, setQty] = useState(1);
    const params = useParams()
    const dispatch = useDispatch()
    
    const navigate = useNavigate();

    const prod = useSelector(state => state.productDetails)
    const userLogin = useSelector(state => state.userLogin)
    const prodReview = useSelector(state => state.productsReviews)

    const { loading, product } = prod
    const { userInfo } = userLogin
    const { 
        success: successReview ,
        loading: loadingReview,
        error: errorReview
     } = prodReview 

    console.log(product)

    useEffect(() => {
      if (product.reviews) {
        setReviews(product.reviews)
      } 

    }, [product.reviews, rating])

    useEffect(() => {
        console.log(qty)
    }, [qty])

    const handleReviewSubmit = (() => {
      dispatch(createProductReview(params._id, { rating, description }))
    })

    useEffect(() => {
      
      if (successReview) {
        setRating(0)
        setMessage("")
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      } 

      dispatch(getSpecifiecProd(params._id))

  }, [dispatch, params, successReview])

  const addToCart = () => {
    navigate(`/cart/${params._id}?qty=${qty}`)
  }

  return (
    <Fragment>
      <Navbar />
        <div className="prod-page">
          <div className="top-prod">
              <Link to='/'>
                <button>
                  <span>Go Back</span>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              </Link>
          </div>
          <div className="inner-prod">
              <div className="container">
                <div className="container-all">
                <div className="prod-img">
                      <img src={`http://localhost:8000${product.product_img}`} alt="asd" />
                  </div>

                  <div className="prod-details">
                      <div className="prod-brand">
                        <h4>{product.category}</h4>
                        <h2>{product.product_name}</h2>
                      </div>
                      <div className="prod-rate">
                          <div className="inner-rate">
                              <FontAwesomeIcon icon={faStar} className='prod-icoa'/>
                              <h4>{product.rating}</h4>
                          </div>
                          <div className="many-rates">
                             <h3>{product.review_count}</h3>
                             <h3>Reviews</h3>
                          </div>
                      </div>
                      <div className="prod-price">
                          <h3>Price: <span>${product.price}</span></h3> 
                          <h5>0%off</h5>
                      </div>
                      <div className="monthly-pay">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} className='monthly-ico'/>
                          <h4>Monthly Payments Started From 20 Dollar</h4>
                      </div>
                      <div className="stock">
                          {
                            product.stockCounter > 0 ? 
                              (<h3>Status: <span className='success'>In Stock</span></h3>) : (<h3>Status: <span className='danger'>Unavailable</span></h3>) 
                          }
                          {/* {
                            product.stockCounter > 0 ? (<h4 className='mt-14'>In Stock: { product.stockCounter }</h4>) : null
                          } */}
                      </div>

                      <div className="add-tocard">
                          {/* <button className='btn-green' onClick={addToCart}>Add To Cart</button> */}
                          {
                            product.stockCounter > 0 ?
                            (
                              <button className='btn-green' onClick={addToCart}>Add To Cart</button>
                            ) : (
                              <button className="disabled">This Product Is Unavailable</button>
                            )
                          }
                          {
                            product.stockCounter > 0 ? (
                                <select name="" id="" value={qty} onChange={e => setQty(e.target.value)}>
                                  {
                                    [...Array(product.stockCounter).keys()].map(sc => (
                                      <option key={sc} value={sc+1}>{sc + 1}</option>
                                    ))
                                  }
                                </select>
                            ) : null
                          }
                      </div>
                      {
                        product.stockCounter === 0 ?
                        (
                          <Error alertMsg="We Are So Sorry That We Don't Have This Product Now, It'll Be offered Soon"/>
                        ) : null
                      }
                  </div>
                </div>
                  
                  <div className="addionals">
                          <div className="container-i">
                              <div className="sl-item">
                                  <FontAwesomeIcon icon={faArrowRotateLeft} />
                                  <h3>You Can Return This Product Easy With <span>Free Return</span></h3>
                              </div>
                              <div className="sl-item">
                                  <FontAwesomeIcon icon={faCertificate} />
                                  <h3>With Guarantee</h3>
                              </div>
                              <div className="sl-item">
                                  <FontAwesomeIcon icon={faStore} />
                                  <h3>Provided By Us</h3>
                              </div>
                          </div>
                          <div className="container-f">
                            <div className="sl-item">
                              <FontAwesomeIcon icon={faTruckFast} />
                              <h3>Fast Shipping And Free Shipping When Buy Products costs 200$ Or More</h3>
                            </div>
                            <div className="sl-item">
                              <FontAwesomeIcon icon={faUserShield} />
                              <h3>We Protect Your Data And Enjoy Secure Shopping</h3>
                            </div>
                          </div>
                    </div>
              </div>
              <div className="prod-reviews">
                  <div className="reviews-head">
                       <h2>Product's Reviews</h2>
                       <h4>See What Clients Have To Say About This Product</h4>
                  </div>
                  {
                    reviews ? (
                      <Fragment>
                          {
                            reviews.map((review => (
                              <div className="review-card" key={review._id}>
                                  <h3>{review.name}</h3>
                                  <Rating rate={review.rating} color="black"/>
                                  <h4>{review.description}</h4>
                                  <h5>{review.created_at.substring(0,10)}</h5>
                              </div>
                            )))
                          }
                      </Fragment>
                    ) : null
                  }
                  <div className="reviews-body">
                      {
                        reviews ? (
                          
                          reviews.length === 0 && (
                              <div className="review-message">
                                  <Warning wrnMsg='No Reviews On This Product Yet' key='warning message'/>
                              </div>
                            )
                          
                        ) : null
                      }
                  </div>
                  {
                    userInfo ? (
                        <div className="review-form">
                          { loadingReview &&  (<Loader />)}
                          { errorReview && <div className='err-review'>
                            <Error alertMsg={errorReview}/>
                          </div> }
                          { successReview && <div className='sucs-review'>
                            <Success successMsg={errorReview}/>
                          </div> }
                          <div className="form-header">
                            <h4>Write a Review</h4>
                          </div>
                          <div className="form">
                                <div className="form-rate">
                                    <h5 className='label'>Select Rating</h5>
                                    <select
                                      className='select-rate'
                                      value={rating}
                                      onChange={(e) => setRating(e.target.value)}
                                    >
                                      <option value="1">bad</option>
                                      <option value="2">not bad</option>
                                      <option value="3">good</option>
                                      <option value="4">very good</option>
                                      <option value="5">excellent</option>
                                    </select>
                                </div>

                                <div className="form-msg">
                                    <h5 className='label'>Message</h5>
                                    <textarea className="msg-area" rows="7" cols='50' value={description} onChange={(e) => setMessage(e.target.value)}>
                                      
                                    </textarea>
                                </div>
                              <button onClick={handleReviewSubmit}><span>Submit</span></button>
                            </div>
                        </div>
                    ) : null
                  }
              </div>
          </div>
        </div>
    </Fragment>
  )
}

export default ProductPage