import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-9 mt-4 mx-auto">
                    <h2 className="text-center text-uppercase" style={{color: '#fff'}}>
                        We are Sorry, Page not found.. !
                    </h2>
                    <h6 className='font-italic mb-5' style={{ color: 'greenyellow'}}>
                        The page you are looking for might have been removed or had its name changes or is temporarily unavailable.
                    </h6>
                    <NavLink className="d-block text-center mt-2 small btn btn-danger" to='/'>Return To Home Page</NavLink>
                </div>
                </div>
            
        </div>
    )
}

export default ErrorPage
