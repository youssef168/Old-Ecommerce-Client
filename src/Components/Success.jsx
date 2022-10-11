import React from 'react'

const Success = (successMsg) => {
  console.log('asd')
  return (
    <div className='scs-msg'>
        <h4>{ Object.values(successMsg) }</h4>
    </div>
  )
}

export default React.memo(Success)