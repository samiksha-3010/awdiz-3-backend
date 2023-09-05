import React,{useContext} from 'react'
import { AuthContext } from './Context/Auth.Context';
import Allproducts from './common/Allproducts';

const Home = () => {
  const {state} = useContext(AuthContext);

  // console.log(state?.user,"-user")

  return (
    <div><h1>Home User Name Welcome - {state?.user?.name} </h1>
    {/* <Allproducts/> */}
    </div>
  )
}
export default Home;