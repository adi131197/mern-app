import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'

const Contact = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    
    useEffect(()=> {
        const userContactPage = async () => {
            try {
                const res = await fetch('/getData', {
                    method: 'GET', 
                    headers:{
                        "Content-Type": "application/json"
                    },
                })
    
                const data = await res.json();
    
                setUserData({
                    ...userData, name: data.name, email: data.email, phone: data.phone
                });
            } catch (err) {
                console.log('Error occured', err)
            }
        }

        userContactPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const handleInputs = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, phone,message} = userData;

        const res = await fetch('/contactus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message
            })
        })
        
        const data = await res.json()

        if(!data) {
            console.log('Message not send.Please try again.')
        } else {
            toast.success('Message send successfully.', {position: toast.POSITION.TOP_CENTER})
            setUserData({
                ...userData,
                message: ""
            })
        }
    }

    return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body align-items-center">
                                <h4 className="card-title">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone">
                                </img>
                                <span> Phone</span>
                                </h4>
                                <p className="card-text">+91 1111 5555 43</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body align-items-center">
                                <h4 className="card-title">
                                <img src="https://img.icons8.com/office/24/000000/new-post--v1.png" alt="email"/>
                                <span> Email</span>
                                </h4>
                                <p className="card-text">adityacheta@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body align-items-center">
                                <h4 className="card-title">
                                <img src="https://img.icons8.com/office/24/000000/address.png" alt="phone">
                                </img>
                                <span> Address</span>
                                </h4>
                                <p className="card-text">Vadodara, GJ, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form  */}
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                    <div className="card mt-4">
                    <div className="card-header">
                        <h4 className="text-center">Get In Touch</h4>
                    </div>
                    <div className="card-body">
                    <form id="contact_form" className="form-signin" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-label-group">
                                    <input type="text" name="name" value={userData.name} onChange={handleInputs} id="inputUserame" className="form-control" placeholder="Username" required />
                                    <label htmlFor="inputUserame">Name</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-label-group">
                                    <input type="email" name="email" id="inputEmail" value={userData.email} onChange={handleInputs} className="form-control" placeholder="Email address" required />
                                    <label htmlFor="inputEmail">Email</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-label-group">
                                    <input type="text" name="phone" id="inputPhone" value={userData.phone} onChange={handleInputs} className="form-control" placeholder="Phone Number"/>
                                    <label htmlFor="inputPhone">Phone</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-label-group">
                                    <textarea cols="30" rows="5" name="message" value={userData.message} onChange={handleInputs} className="form-control" placeholder="Message" />
                                </div>    
                            </div>
                        </div>
                        <hr className="my-1" />
                        <div className="row mt-2">
                            <div className="col-lg-3">
                            <button className="btn btn-primary text-uppercase" type="submit">Send Message</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>    
                    </div>
                </div>
                
            </div>
    )
}

export default Contact
