import React, { Fragment } from 'react'

const BlackBtn = (props) => {
  return (
    <Fragment>
        <button className="black-btn" { ...props }>{ Object.values(props.text) }</button>
    </Fragment>
  )
}

export default React.memo(BlackBtn)