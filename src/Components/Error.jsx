import React from 'react'

const Error = (alertMsg) => {
  return (
    <div className="alert-msg">
        <h4>{ Object.values(alertMsg) }</h4>
    </div>
  )
}

export default React.memo(Error)