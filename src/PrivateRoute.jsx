// import React, { Fragment } from 'react'
// import { Route, Redirect } from 'react-router-dom'

// function PrivateRoute({isAuth, component: Component, ...rest}) {
//         return (
//             <Route {...rest} 
//                 render={() => {
//                     return isAuth ? (
//                         <Component />
//                     ) : (
//                         <Redirect to='/signup' />
//                     )
//                 }}
//             />
//         )    
// }
// export default React.memo(PrivateRoute)