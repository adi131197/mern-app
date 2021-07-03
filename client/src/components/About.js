import React, {useEffect, useState} from 'react'
import { useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'

const About = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({})
    
    useEffect(()=> {
        const callAboutPage = async () => {
            try {
                const res = await fetch('/about', {
                    method: 'GET', 
                    headers:{
                        Accept: 'application-json',
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
    
                const data = await res.json();
    
                setUserData(data);
    
                if(res.status !== 200) {
                    history.push('/login')
                }
            } catch (err) {
                console.log('Error occured', err)
                toast.error('Please Login to view About Page', {position: toast.POSITION.TOP_CENTER})
                history.push('/login')
            }
        }

        callAboutPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    return (
        <div className="container">
            <form method="GET">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card flex-row my-5">
                            <div className="card-body">
                                <h2 className="card-title text-center">{userData.name}</h2>
                                <p className="card-text text-center">{userData.work}</p>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="experience-tab" data-toggle="tab" href="#experience" role="tab">Experience</a>
                                    </li>
                                </ul>
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="about" role="tabpanel">
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.email}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.phone}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.work}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="experience" role="tabpanel">
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Developer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default About
