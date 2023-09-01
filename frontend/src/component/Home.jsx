import React,{useContext} from 'react'
import { AuthContext } from './Context/Auth.Context';
import AllProducts from './Comman/AllProducts'

export const Home = () => {
  const {state} = useContext(AuthContext);

  // console.log(state?.user,"-user")

  return (
    <div><h1>Home User Name - {state?.user?.name} </h1>
    <AllProducts/></div>
  )
}
