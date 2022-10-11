import React, { Fragment } from 'react'
import Logo from './Logo'
import FacebookIco from '../constants/assets/facebook.png'

const Footer = () => {
  return (
    <Fragment>
        <footer>
           <div className="container">
              <div className="footer-logo">
                   <Logo />
                   <h4>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some,</h4>
                   <div className="socials">
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-instagram"></i>
                   </div>
              </div>
              <div className="footer-item">
                  <div className="footer-head">
                      <h3>Help</h3>
                  </div>
                  <div className="body-footer">
                      <h4 className="body-footer_item">Privacy Policy</h4>
                      <h4 className="body-footer_item">Shipping & Delivery</h4>
                      <h4 className="body-footer_item">Refund Policy</h4>
                      <h4 className="body-footer_item">Track Your Order</h4>
                  </div>
              </div>
              <div className="footer-item">
                  <div className="footer-head">
                      <h3>Store</h3>
                  </div>
                  <div className="body-footer">
                      <h4 className="body-footer_item">Top Products</h4>
                      <h4 className="body-footer_item">Best Products</h4>
                      <h4 className="body-footer_item">All Products</h4>
                      <h4 className="body-footer_item">Offers</h4>
                  </div>
              </div>
              <div className="footer-item">
                  <div className="footer-head">
                      <h3>Support</h3>
                  </div>
                  <div className="body-footer">
                      <h4 className="body-footer_item">Feedback</h4>
                      <h4 className="body-footer_item">Contact Us</h4>
                      <h4 className="body-footer_item">Download App</h4>
                      <h4 className="body-footer_item">Terms & Conditions</h4>
                  </div>
              </div>
           </div>
       </footer>
    </Fragment>
  )
}

export default React.memo(Footer)