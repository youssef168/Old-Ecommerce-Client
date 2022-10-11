import React, { useEffect } from 'react'
import { Fragment } from 'react'
import Logo from './Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { convertName } from '../Helpers/Utils'
import { motion } from 'framer-motion'
import useRequireAuth from '../Hooks/useRequireAuth'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  useRequireAuth()
  const userLogin = useSelector(state => state.userLogin)
  const navigate = useNavigate()

  const { userInfo } = userLogin

  
  return (
    <Fragment>
      <header>
        <div className="container px-10 header">
            <Logo />
            <div className="center">
                <ul className="items">
                    <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: .9 }}  transition={{ duration: .2 }}>Top</motion.li>
                    <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: .9 }}  transition={{ duration: .2 }}>Best</motion.li>
                    <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: .9 }}  transition={{ duration: .2 }}>All</motion.li>
                    <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: .9 }}  transition={{ duration: .2 }}>Offers</motion.li>
                </ul>
            </div>
            <div className='end'>
              <FontAwesomeIcon icon={faCartShopping} className="mr-2 icon"/>
                <div className='user-menu'>
                    <FontAwesomeIcon icon={faUser} className="icon"/>
                    {
                      userInfo ? (
                        <h5 className="spc-name">{ convertName(userInfo.username) }</h5>
                      ) : null
                    }
                </div>
            </div>
        </div>
      </header>
    </Fragment>
  )
}

export default React.memo(Navbar)