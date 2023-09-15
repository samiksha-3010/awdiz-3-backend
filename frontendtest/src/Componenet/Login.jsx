import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/Auth.Context'
import toast from 'react-hot-toast'

const Login = () => {
  const router = useNavigate()
  const {state,dispatch} = useContext(AuthContext)
  const [userData,setUserData] = useState ({email:"",password:""})
  const handleChange = (event) =>{
    setUserData({...userData,[event.target.name]:event.target.value})
  }
  const handleSubmit = async (event)=>{
    event.preventDefault()
    if(userData.email && userData.password){
      const response= await axios.post("http://localhost:8000/",{userData})
      if(response.data.success){
        dispatch({type:"LOGIN",
        payload:response.data.user

      })
      localStorage.setItem("token",JSON.stringify(response.data.token))
      setUserData ({email:"",password:""})
      router("/")
      toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }else{
      toast.error("All Fields Are Mandotry")
    }
  }
  console.log(userData, "-userData")
  useEffect(() =>{
if(state?.user?.name){
  router("/")
}
  },[])
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>Email</label><br/>
      <input type='text'name='email' onChange={handleChange} value={userData.email}/><br/>
      <label>Password</label><br/>
      <input type='text'name='password' onChange={handleChange} value={userData.password}/><br/>
      <input type='submit' value='login'/>
      </form>
    </div>
  )
}

export default Login