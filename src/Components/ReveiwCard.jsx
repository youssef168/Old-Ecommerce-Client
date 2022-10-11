import React, { Fragment } from 'react'
import UserImg from '../constants/assets/icons8-user-100.png'

const ReveiwCard = () => {
  return (
    <Fragment>
        <div className="review-card">
            
            <div className="details">
                <h3>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum</h3>
                <div className="user">
                    <h2>Sameer Jain</h2>
                    <img src={UserImg} alt="" />
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default React.memo(ReveiwCard)