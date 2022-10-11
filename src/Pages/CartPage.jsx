import React, { Fragment, useCallback, useEffect } from 'react'
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteItem } from '../State/Actions/CartActions';
import Navbar from '../Components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Warning from '../Components/Warning';

const CartScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams(); // React Router Hook That Return Or Post Search Params
    const dispatch = useDispatch(); // initial Dispatcher
    const params = useParams() // Get All Params
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)

    const qty = searchParams.get('qty')
    const prodID = params._id

    useEffect(() => {
        if (prodID) {
            dispatch(addToCart(params._id, qty))
        } else {
            console.log('no')
        }
    }, [dispatch,prodID])

    useEffect(() => {
        cartItems.map(item => {
            console.log(item.img)
        })
    }, [cartItems])

    const increaseQty = useCallback((item,e) => {
        dispatch(addToCart(item.product, Number(e)))
        const reQty = e
        setSearchParams({ qty: reQty })
    }, [])

    const deleteItemFromCart = (ID) => {
        dispatch(deleteItem(ID))
    }

    useEffect(() => {
        console.log(cartItems.reduce((acc, item) => console.log(acc, item), 1))
    }, [cartItems])
  
    const moveToShipping = useCallback(() => {
        navigate('/shipping')
    }, [])
  return (
    <Fragment>
        <Navbar />
        <div className="container mt-5">
            <div className="container-in">
                <div className="right-side">
                    <h2>Your Shopping Cart</h2>

                    {
                        cartItems.length > 0 ? (
                            <div className="shopping-items">
                                {
                                    cartItems.map(item => (
                                        <div className="shopping-item">
                                            <div className="sh-img">
                                                <img src={`http://localhost:8000${item.img}`} alt="Faild To Load Photo" />
                                            </div>
                                            <div className="sh-details">
                                                <div className="sh-title">
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <div className="sh-price">
                                                    <h4>${item.price}</h4>
                                                </div>
                                                <div className="sh-qty">
                                                    <select value={item.qty} onChange={e => increaseQty(item,e.target.value)}>
                                                        {
                                                            [...Array(item.stock).keys()].map((i) => (
                                                                <option value={i+1} key={i+1}>{i+1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <motion.div className="trash-item" whileHover={{ scale: 1.2 }} whileTap={{ scale: .9 }}>
                                                    <FontAwesomeIcon icon={faTrashCan} onClick={ () => deleteItemFromCart(item.product) }/>
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : <Warning wrnMsg="Your Cart Is Empty!"><Link to='/'>Go Back To Home</Link></Warning>
                    }
                </div>
                <div className="left-side">
                    <div className="box">
                        <div className="b-title-price">
                            {
                                cartItems.length > 0 ?
                                (
                                    <Fragment>
                                        <h2>Total Items Is { cartItems.reduce((acc, item) => acc + Number(item.qty), 0) }</h2>
                                        <h4>
                                            ${ 
                                                cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
                                            }
                                        </h4>
                                    </Fragment>
                                ) : <h2>No Items Here</h2>
                            }
                        </div>
                        {
                            cartItems.length > 0 ? (
                                <button onClick={() => moveToShipping()}>Proceed to checkout</button>
                            ) : <button className='disabled'>Proceed to checkout</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default CartScreen