import React, { Fragment } from 'react'

const GreenBtn = text => {
  return (
    <Fragment>
        <button className='a-btn'>{ Object.values(text) }</button>
    </Fragment>
  )
}

export default React.memo(GreenBtn)