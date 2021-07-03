import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';
import { UserContext } from '../App'
import { toast } from 'react-toastify';

const Login = () => {
    const {dispatch} = useContext(UserContext)

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json();
        if(res.status === 400 || !data) {
            toast.error('Invalid Credentials', {position: toast.POSITION.TOP_CENTER})
        } else {
            dispatch({
                type: 'USER',
                payload: true
            })
            toast.success('Login successfull !!', {position: toast.POSITION.TOP_CENTER})
            Cookies.set('jwttoken', data.token, {expires: new Date(Date.now + 600000)})
            history.push('/')
        }

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                    <div className="card-img-left d-none d-md-flex">
                        {/* Background Image for card set in css! */}
                    </div>
                    <div className="card-body">
                        <h2 className="card-title text-center">Sign In</h2>
                        <form method='POST' className="form-signin">

                        <div className="form-label-group">
                            <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required value={email} onChange={e=> setEmail(e.target.value)}/>
                            <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required value={password} onChange={e=> setPassword(e.target.value)}/>
                            <label htmlFor="inputPassword">Password</label>
                        </div>
                        <hr className="my-4" />
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" name="signin" id="signin" type="submit" onClick={loginUser}>Login</button>
                        <NavLink className="d-block text-center mt-2 small" to="/signup">Create an Account</NavLink>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
