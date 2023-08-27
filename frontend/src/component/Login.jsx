import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./All css/Login.css"
import { AuthContext } from './Context/Auth.Context'

const Login = () => {

    const  { state ,dispatch } = useContext(AuthContext)
    const [userData, setUserData] = useState({ email: "", password: "" })

    const router = useNavigate()

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            const response = await axios.post("http://localhost:8000/login", { userData });
            if (response.data.success) {
                dispatch({
                    type: 'LOGIN',
                    payload: response.data.user
                })
                localStorage.setItem("token", JSON.stringify(response.data.token))
                setUserData({ email: "", password: "" })
                router('/')
                toast.success(response.data.message)
                const user = response.data.user
                const token = response.data.token
                // console.log( response.data)
                //   await Login(user,token)
                //   localStorage.setItem("token", JSON.stringify(response.data.token))
                // setUserData({ email: "", password: "" })
                // router('/')
                // toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }
    // console.log(userData, "userData")


    useEffect(() => {
        if (state?.user?.name) {
            router('/')
        }
    }, [state])
    return (
        <div  className='body-first'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label className='email'>Email</label><br />
                <input  className='input-email' type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label >Password</label><br />
                <input  className='input-email' type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <input  className='submit' type='submit' value='Login' /><br />
            </form>
            <button  className='submit' onClick={() => router('/register')}>Register</button>
            <p style={{color:"red"}}  onClick={() => router('/register')}>New Register</p>
        </div>
    )
}
export default Login
