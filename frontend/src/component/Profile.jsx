import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/Auth.Context'
import toast from 'react-hot-toast'
import AuthProtected from './common/AuthProtected'
import api from './apiConfig/index'

const Profile = () => {
    const [number, setNumber] = useState()
    const [otp, setOtp] = useState()
    const [isNumberVerified,  setIsNumberVerified] = useState(true)
    const [isOtpSent,setIsOtpSent] = useState(false)
    const {state} = useContext(AuthContext)

    console.log(state)

    const sendOtp = async () => {
        const response = await api.post('/all/send-otp', { userId: state?.user?._id });
        if (response.data.success) {
            setIsOtpSent(true);
            toast.success("Otp has sent , please verifyied it.")
        }
    }
    const verifyOtp = async () => {
        const response = await api.post('/all/verify-otp', { userId: state?.user?._id, otp });
        if (response.data.success) {
            setIsOtpSent(false);
            setIsNumberVerified(response.data.isNumberVerified)
            toast.success("Otp is Verified.")
        }
    }

    useEffect(() => {
        async function getNumber() {
            // alert("called fuction")
            try {
                const response = await api.post("/all/get-number", { userId: state?.user?._id })
                if (response.data.success) {
                    // console.log(response.data, "response.data")
                    setNumber(response.data.number)
                    setIsNumberVerified(response.data.isNumberVerified)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (state?.user?._id) {
            getNumber()
        }
    }, [state])
  return (
    <AuthProtected>
    <h1>Your Profile</h1>
            <h3>Complete Your Phone Verification</h3>
            <h4>Your Number : {number}</h4>
            {isNumberVerified ? <h4>Your number verified.</h4> : <button onClick={sendOtp}>Verify Your Number</button>}
            {isOtpSent && <div>
                <input onChange={(event) => setOtp(event.target.value)} placeholder='Type your otp' />
                <button onClick={verifyOtp}>Submit Otp</button>
              
               
            </div>}
    </AuthProtected>
  )
}

export default Profile;