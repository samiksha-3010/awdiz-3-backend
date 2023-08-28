import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./All css/Register.css"
import { AuthContext } from './Context/Auth.Context'

const Register = () => {
    const {state} =useContext(AuthContext)
    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer",number:""})
    console.log(userData,"-userData")

    const router = useNavigate()

    const handleChange = (event) => {
        setUserData({ ...userData,[event.target.name]: event.target.value })
    }
    const handleChangeForSelect = (event) => {
        setUserData({ ...userData,"role": event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role && userData.number) {
            if (userData.password === userData.confirmPassword) {


                const response = await axios.post("http://localhost:8000/register", {userData});
                if (response.data.success) {

                    setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer",number:"" })
                    router('/login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }

            } else {
                toast.error("Password and confirm password not matched...")
            }
        } else {
            toast.error("All field are mandtory...")
        }
    }
    console.log(userData, "userData")


    useEffect(() => {
        if (state?.user?.name) {
            router('/')
        }
    }, [state])

    return (
        <div className='body-first'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label >Name</label><br />
                <input className='input-email' type='text' onChange={handleChange} name='name' value={userData.name} /><br />
                <label>Email</label><br />
                <input className='input-email' type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <lable>Number</lable><br/>
                <input className='input-email'type='number' onChange={handleChange} name='number' value={userData.number}/><br/>
                <label>Role</label><br />
                <select onChange={handleChangeForSelect} >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select><br />
                <label>Password</label><br />
                <input className='input-email' type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <label>Confirm Password</label><br />
                <input className='input-email'  type='password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} /><br />
                <input  className='submit' type='submit' value='Register' /><br />
            </form>
            {/* <button className='submit' onClick={()=> router('/login')}>Login</button> */}
            <p style={{color:"red"}} onClick={()=> router('/login')}>Already have Acount Click Here?</p>
        </div>
    )
}

export default Register