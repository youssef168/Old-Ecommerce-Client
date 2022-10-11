import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Signup from './Pages/Signup'
import Footer from './Components/Footer'
import ProductPage from './Pages/ProductPage'
import Navbar from './Components/Navbar'
import CartScreen from './Pages/CartPage'
import ShippingPage from './Pages/ShippingPage'
import Payment from './Pages/Payment'
import Placeorder from './Pages/Placeorder'
import OrderPage from './Pages/OrderPage'

function Router() {
    

  return (
    <Fragment>
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Home />}/>
                <Route  path="/signup" element={<Signup />}/>
                <Route  path="/product/:_id" element={<ProductPage />}/>
                <Route  path="/cart/:_id" element={<CartScreen />} />
                <Route  path="/shipping" element={<ShippingPage />} />
                <Route  path="/payment"  element={<Payment />} />
                <Route  path="/placeorder" element={<Placeorder />}/>
                <Route  path="/order/:_id" element={<OrderPage />}/>
            </Routes>
        </BrowserRouter>
        <Footer />
    </Fragment>
  )
}

export default React.memo(Router)