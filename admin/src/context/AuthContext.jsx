import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("admin")) || null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // set data to local storage
    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};