import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Logo from '../Components/Logo'
import Head from '../Helpers/Head'
import { nameRegex } from '../constants/Regex'
import Error from '../Components/Error'
import Success from '../Components/Success'
import Warning from '../Components/Warning'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../State/Actions/UserActions'
import { useNavigate } from 'react-router-dom'
import ShoppingIcon from '../constants/assets/undraw_shopping_app_flsj.svg'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const registerValue = useSelector(state => state.userRegister)
    const { userDetails, userErrors, loading } = registerValue
    


    const [password, setPassword] = useState('')
    
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
    })
    const [success, setSuccess] = useState({
        email: '',
        name: '',
        password: '',
    })

    const [warnings, setWarnings] = useState("")
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const onSubmit = useCallback(e => {
       e.preventDefault();

       dispatch(register(name, email, password))
       
    })

    useEffect(() => {
        if (userDetails) {
            navigate('/')
        } else {
            return;
        }
    }, [userDetails])
    

    const handleNameChange = e => {
        setName(e.target.value)
        if (nameRegex.test(name)) {
            setErrors({name: ''})
            setSuccess({name: 'Your Name Is Valid!'})
        } else {
            setSuccess({ name: '' })
            setErrors({ name:  'Your Name is not valid! Read The Rules'})
        }
    }

    const handlePasswordChange = e => {
        setPassword(e)
        if (password.length < 6) {
            setErrors({password: 'Your Password is too short'})
            setSuccess({ password: '' })
            setWarnings('')
        } 
        if (password.length >= 6 && password.search(/[a-z]/ < 0)) {
            setErrors({password: ''})
            setSuccess({password: ''})
            setWarnings("Your Password is short and must be at least 6 characters and at least one lower case letter")
        } 
        if (password.length >= 8 && password.search(/[A-Z]/) < 0) {
            setErrors({password: ''})
            setSuccess({password: ''})
            setWarnings("Your Password must be more than 8 characters and at least one upper case letter")
        } if (password.length >= 12){
            setErrors({password: ''})
            setWarnings("")
            setSuccess({ password: "Your Password is Strong" })
        }
        
    }

   
    
  return (
    <Fragment>
        <div className="ps-abs">
            <Logo />
        </div>

        <div className="container-log">
            <div className="left w-50 ps-rel">
                <div className="inner-left">
                    <Head text="Signup" />
                    <div className="form-container">
                        <form method="POST" onSubmit={onSubmit}>
                            <div className="form-group mb-4">
                                <span className="form-label">Name</span>
                                <input type="text" value={name} onChange={(e) => handleNameChange(e)}/>
                                {
                                    errors.name && (
                                        <Fragment>{ <Error alertMsg={errors.name}/> }</Fragment>
                                    )
                                }
                                {
                                    success.name && (
                                        <Fragment>{ <Success alertMsg={success.name}/> }</Fragment>
                                    )
                                }
                            </div>
                            
                            <div className="form-group mb-4">
                                <span className="form-label">E-mail</span>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            
                            <div className="form-group">
                                <span className="form-label">Password</span>
                                <input type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)}/>
                                {
                                    errors.password && (
                                        <Fragment>{ <Error alertMsg={errors.password}/> }</Fragment>
                                    )
                                }
                                {
                                    success.password && (
                                        <Fragment>{ <Success alertMsg={success.password}/> }</Fragment>
                                    )
                                }
                                {
                                    warnings && (
                                        <Fragment>{ <Warning wrnMsg={warnings}/> }</Fragment>
                                    )
                                }
                            </div>
                            <button type='submit' className={loading ? "loading" : ""}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="right w-50">
                <div className="innerRight">
                    <div className="img-cover">
                        <img src={ShoppingIcon} alt="" />
                    </div>

                    <div className="description">
                        <div className="head">
                            <h3>Shopping Safe With</h3> <Logo />
                        </div>
                        <div className="bottom">
                            <h5>What distinguishes us is providing complete security from the security of your personal and banking information, providing the best shipping service, and obtaining a great user experience</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Signup