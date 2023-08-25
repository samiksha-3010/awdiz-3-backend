import { createContext, useEffect, useReducer } from "react";
import axios  from "axios";
export const AuthContext = createContext();
const initialState = { user: null,token:null };

function reducer(state, action) { 
    switch (action.type) {
        case "login":

        return {
            ...state,
            currentuser: action.payload,
            token: action.token,
          };
         
        case "logout":
            return {  currentuser: null,token:null } // re - assign
        default:
            return state;
    }
}


const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (userData,token) => {

        localStorage.setItem("UserData", JSON.stringify("userData"))
        localStorage.setItem("UserToken", JSON.stringify("token"))

       
    }

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
     
        dispatch
         ({ type: 'logout',})
    };

    useEffect(() => {

        const getToken = JSON.parse(localStorage.getItem("userToken"));
    const userData = JSON.parse(localStorage.getItem("userData"));
            dispatch({
                type: 'login',
                token:getToken,
                payload: userData
            })
        
    }, [])

    return (
        <AuthContext.Provider value={{ state, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;



// import { createContext, useEffect, useReducer } from "react";
// import axios  from "axios";
// export const AuthContext = createContext();
// const initialState = { user: null,token:null };

// function reducer(state, action) { 
//     switch (action.type) {
//         case "LOGIN":

//         return {
//             ...state,
//             currentuser: action.payload,
//             token: action.token,
//           };
         
//         case "LOGOUT":
//             return {  currentuser: null,token:null } // re - assign
//         default:
//             return state;
//     }
// }

// const HandleAuthContext = ({children}) =>{
//     const [state,dispatch] = useReducer(reducer,initialState)

//     useEffect(()=>{
//         async function getCurrentUserData(){
//             var token = JSON.parse(localStorage.getItem("token"));
//             const response = await axios.post("http://localhost:3000/get-current-user",{token})
//             if(response.data.success){
//                 dispatch({ 
//                     type:"LOGIN",
//                     payload:response.data.user
//                 })
//             }else{
//                 dispatch({type:"LOGOUT"});
//             }
//         }
//         getCurrentUserData();
//     },[])

//     return(
//         <AuthContext.Provider value={{state,dispatch}}>
//          {children}
//         </AuthContext.Provider>
//     )
// }
// export default HandleAuthContext

