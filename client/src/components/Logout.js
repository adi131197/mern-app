import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import {toast} from 'react-toastify'

const Logout = () => {
    const {dispatch} = useContext(UserContext);
    const history = useHistory()

    const logoutpage = async () => {
        const res = await fetch('/logoutuser', {
            method: 'GET',
            headers: {
                Accept: 'application-json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        dispatch({
            type: 'USER',
            payload: false
        })
        toast.success('Logout successfull !!', {position: toast.POSITION.TOP_CENTER})
        history.push('/login', {replace: true})
        if(res.status !== 200) {
            throw new Error(res.error)
        }
    }

    useEffect(()=> {
        logoutpage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <h1>Logout page</h1>   
        </>
    )
}

export default Logout
