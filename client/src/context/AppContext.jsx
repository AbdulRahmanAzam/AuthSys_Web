import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getUserData = useCallback(async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data');
            // toast.success("User data fetched successfully");
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message)
        }
    }, [backendUrl])

    const getAuthState = useCallback(async () => {
        try {
            console.log('Trying to connect to:', backendUrl + '/api/auth/is-auth');
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
            if(data.success){
                setIsLoggedin(true);
                getUserData();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            if (error.code === 'ERR_NETWORK') {
                toast.error(`Cannot connect to backend at ${backendUrl}. Check if backend is running.`);
            } else {
                toast.error(error.message);
            }
        }
    }, [backendUrl, getUserData])

    useEffect(() => {
        getAuthState();
    }, [getAuthState]) // Include getAuthState in dependency array

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

// export default AppContext;