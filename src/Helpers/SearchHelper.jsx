import React, { Fragment } from 'react'

function SearchHelper() {
  return (
    <Fragment>
        <div className="search" style={ { boxShadow: 'rgb(17 12 46 / 15%) 0px 48px 100px 0px' } }>
            <input type="text" placeholder='Search For Anything'/>
            <button>Search</button>
        </div>
    </Fragment>
  )
}

export default React.memo(SearchHelper)