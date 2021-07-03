import React, {useEffect, useState} from 'react'

const Home = () => {

    const [userName, setUserName] = useState('')
    const [show,setShow] = useState(false);
    
    useEffect(()=> {
        const userHomePage = async () => {
            try {
                const res = await fetch('/getData', {
                    method: 'GET', 
                    headers:{
                        "Content-Type": "application/json"
                    },
                })
    
                const data = await res.json();
    
                setUserName(data.name);
                setShow(true);
    
            } catch (err) {
                return
            }
        }
        
        userHomePage()
    }, []) 

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-10 offset-lg-1 text-center">
                <p className="display-4" style={{color: '#fff'}}>Welcome</p>
                <h3><strong style={{color: '#fff'}}>{userName}</strong></h3>
                <h3 style={{color: 'greenyellow'}}>{show ? 'Happy, to see you back' : <span>Developed with <span style={{color: 'red'}}>♥</span> using MERN Stack</span>}</h3>
                </div>
            </div>
            
        </div>
    )
}

export default Home;
