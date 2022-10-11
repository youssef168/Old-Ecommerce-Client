import React, { Fragment } from 'react'

function Logo() {
  return (
    <Fragment>
        <div className="logo">
            <h3><span className='yl-color'>A</span>.Shop</h3>
        </div>
    </Fragment>
  )
}

export default React.memo(Logo)