import React,{useContext} from 'react'
import { AuthContext } from './Context/Auth.Context';

export const Home = () => {
  const {state} = useContext(AuthContext);

  // console.log(state?.user,"-user")

  return (
    <div>Home User Name - {state?.user?.name}</div>
  )
}
