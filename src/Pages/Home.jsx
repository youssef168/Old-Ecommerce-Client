import React, { Fragment, useEffect, useState } from 'react'
import useRequireAuth from '../Hooks/useRequireAuth'
import '../Sass/main.css'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import babyImage from '../constants/assets/image10.svg'
import GreenBtn from '../Components/GreenBtn'
import SearchHelper from '../Helpers/SearchHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast, faGifts, faCreditCard, faHeadset } from '@fortawesome/free-solid-svg-icons'
import labtopImage from '../constants/assets/w9.png'
import nikeImage from '../constants/assets/nike-logo-49337.png'
import HMLogo from '../constants/assets/hm-logo-1.png'
import ZaraLogo from '../constants/assets/Zara.png'
import levisLogo from '../constants/assets/levis-logo-3.png'
import AmazonImg from '../constants/assets/amazon.png'
import { topProduct } from '../State/Actions/ProductAction'
import Loader from '../Components/Loader'
import Product from '../Components/Product'
import { Swiper, SwiperSlide } from 'swiper/react'
import  { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReveiwCard from '../Components/ReveiwCard'
import TopImg from '../constants/assets/icons8-award-60.png'
import Navbar from '../Components/Navbar'

function Home() {

  // Hook To Check If User Is Logged In
  useRequireAuth()

  const dispatcher = useDispatch()

  const allProducts = useSelector(state => state.topProducts)

    useEffect(() => {
        // Get Our Top Products
        dispatcher(topProduct())
    }, [dispatcher])

    const { loading ,products } = allProducts

    let adaptProducts;

    if (products === undefined) {
        return;
    } else {
        adaptProducts = products.slice(0,3)

        console.log(adaptProducts)

    }

  return (
    <Fragment>
        <Navbar />
      <div className="brand px-10">
          <div className="container">
            <div className="text">
              <h4>TRENDING COLLECTION</h4>
              <h2>Explore Summer Collection</h2>
              <GreenBtn text="Explore"/>
            </div>

            <div className='img-cover'>
               <img src={babyImage} alt="" />
            </div>
          </div>
      </div>
     <SearchHelper />

     <motion.div className='items-container'>
        <motion.div className='item'>
            <div className='inner-item'>
              <h4>Free Shipping!</h4>
              <h6>Orders Over 100$</h6>
            </div>
            <FontAwesomeIcon icon={faTruckFast} className="icon-item"/>
        </motion.div>
        <motion.div className='item'>
        <div className='inner-item'>
              <h4>Smart Gifts!</h4>
              <h6>Buy $1000 To Get One</h6>
          </div>
          <FontAwesomeIcon icon={faGifts} className="icon-item"/>
        </motion.div>
        <motion.div className='item'>
          <div className='inner-item'>
              <h4>Quick Payments</h4>
              <h6>100% Secure Payment</h6>
          </div>
          <FontAwesomeIcon icon={faCreditCard} className="icon-item"/>
        </motion.div>
        <motion.div className='item'>
          <div className='inner-item'>
              <h4>24/7 Support</h4>
              <h6>Quick Support</h6>
          </div>
          <FontAwesomeIcon icon={faHeadset} className="icon-item"/>
        </motion.div>
     </motion.div>

      <div className='bCards'>
          <div className="container">
              <div className="bCard">
                  <div className="text-bCard">
                      <h3>Explore Top Product</h3>
                      <h5>The One <span className='spc-txt'>Top</span> Product Is Ready</h5>
                      <button>Buy Now!</button>
                  </div>
                  <img src={labtopImage} alt="" />
              </div>
              <div className="bCard-2">
                  <div className="text-bCard">
                      <h3>Explore best Products</h3>
                      <h5>Best Products <span className='spc-txt'>Just</span> For You!</h5>
                      <button>Buy Now!</button>
                  </div>
                  <img src={labtopImage} alt="" />
              </div>
          </div>
      </div>

      <div className="brands">
          <div className="container">
              <div className="inner">
                <div className="head-brands">
                    <h2>Deal With Your Favourite Brands!</h2>
                    <h4>Up To <span>60%</span> off on brands</h4>
                </div>
                <div className="brand-body">
                    <div className="body-item">
                        <img src={nikeImage} alt="" />
                    </div>
                    <div className="body-item">
                        <img src={HMLogo} alt="" />
                    </div>
                    <div className="body-item">
                        <img src={ZaraLogo} alt="" />
                    </div>
                    <div className="body-item">
                        <img src={levisLogo} alt="" />
                    </div>
                    <div className="body-item">
                        <img src={AmazonImg} alt="" />
                    </div>
                </div>
              </div>
          </div>
      </div>

      <div className="trending">
            <div className="head-trending">
                <h2>Trending Collection</h2>
                <h4>Check out most promising product bought by our buyers</h4>
            </div>
            <div className="container">

                { loading ? <div className="loading-contaienr"> <Loader /> </div> : null}

                { adaptProducts && (
                    adaptProducts.map((product) => (
                        <Product product={product}/>
                    ))
                ) }

            </div>

            <div className="show">
                <GreenBtn text="Show All"/>
            </div>
      </div>

      <div className="reviews">
            <div className='review-title'>
                <h2>Reviews</h2>
                <h4>See What Our Clients Say About Us!</h4>
            </div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
                }}
                className="mySwiper"
                pagination={true}
                modules={[EffectCoverflow, Pagination]}>
                <SwiperSlide><ReveiwCard /></SwiperSlide>
                <SwiperSlide><ReveiwCard /></SwiperSlide>
                <SwiperSlide><ReveiwCard /></SwiperSlide>
                <SwiperSlide><ReveiwCard /></SwiperSlide>
            </Swiper>
      </div>

      <div className="top-side">
          <div className="img">
              <img src={TopImg} alt="" />
          </div>
          <div className="body">
            <h2>Best Product Is Here!</h2>
            <h4>Best Produt Is The Product That Have Five Stars Rating And Best Review, We Recommend It To You!</h4>
            <GreenBtn text="Check It Out"/>
          </div>
      </div>
       
    </Fragment>
  )
}

export default Home