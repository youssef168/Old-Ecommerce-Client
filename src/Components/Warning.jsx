import React from 'react'

const Warning = (wrnMsg, children) => {
  return (
    <div className="wrn-msg">
        <h4>{ Object.values(wrnMsg) }</h4>
    </div>
  )
}

export default React.memo(Warning)