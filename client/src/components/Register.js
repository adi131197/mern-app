import React, { useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'

const Register = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    })

    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword} = user;
        const res = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                email, 
                phone, 
                work, 
                password, 
                cpassword
            })
        })

        const data = await res.json();

        if(data.status === 422 || !data) {
            toast.error('Please fill proper data', {position: toast.POSITION.TOP_CENTER})
        } else {
            toast.success('Registration successfull !!', {position: toast.POSITION.TOP_CENTER})
            history.push('/login')
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
                        <h2 className="card-title text-center">Sign Up</h2>
                        <form className="form-signin" onSubmit={e => onSubmit(e)}>
                        <div className="form-label-group">
                            <input type="text" name="name" id="inputUserame" className="form-control" placeholder="Username" required onChange={handleInputs} value={user.name} />
                            <label htmlFor="inputUserame">Username</label>
                        </div>

                        <div className="form-label-group">
                            <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required onChange={handleInputs} value={user.email} />
                            <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input type="text" name="phone" id="inputPhone" className="form-control" placeholder="Phone Number" required onChange={handleInputs} value={user.phone} />
                            <label htmlFor="inputPhone">Phone Number</label>
                        </div>

                        <div className="form-label-group">
                            <input type="text" name="work" id="inputWork" className="form-control" placeholder="Work" required onChange={handleInputs} value={user.work} />
                            <label htmlFor="inputWork">Profession</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={handleInputs} value={user.password} />
                            <label htmlFor="inputPassword">Password</label>
                        </div>
                        
                        <div className="form-label-group">
                            <input type="password" name="cpassword" id="inputConfirmPassword" className="form-control" placeholder="Password" required onChange={handleInputs} value={user.cpassword} />
                            <label htmlFor="inputConfirmPassword">Confirm password</label>
                        </div>
                        <hr className="my-4" />
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" name="signup" id="signup" type="submit">Register</button>
                        <NavLink className="d-block text-center mt-2 small" to="/login">Already Registered ?</NavLink>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
