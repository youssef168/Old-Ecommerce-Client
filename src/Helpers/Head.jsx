import React, { Fragment } from 'react'

function Head(text) {
  return (
    <Fragment>
        <h3 className='head mb-4X'>{ Object.values(text) }</h3>
    </Fragment>
  )
}

export default React.memo(Head)