import React, { useContext } from 'react'
import { NavLink} from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const {state} = useContext(UserContext)

    const RenderMenu = () => {
        return(
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    {
                        state ? 
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li> :
                        <> 
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Register</NavLink>
                        </li>
                        </>
                    }
                </>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/"><span style={{fontFamily:"monospace"}}>MERN</span></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                    <RenderMenu/>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;