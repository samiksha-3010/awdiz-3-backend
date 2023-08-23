import { createContext, useEffect, useReducer } from "react";
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
            return { user: null,token:null } // re - assign
        default:
            return state;
    }
}
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (userData,token) => {

        localStorage.setItem("UserData", JSON.stringify("userData"))
        localStorage.setItem("UserToken", JSON.stringify("token"))

        dispatch({
            type: 'login',
            payload: userData,
            token:token,
        })
    }

    const logout = () => {
     
        dispatch({ type: 'logout'})
        localStorage.setItem("UserData", JSON.stringify("userData"))
        localStorage.setItem("UserToken", JSON.stringify("token"))
    }

    // useEffect(() => {
    //     if (isUserPresent) {
    //         dispatch({
    //             type: 'login',
    //             payload: isUserPresent
    //         })
    //     }
    // }, [])

    return (
        <AuthContext.Provider value={{ state, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;