import { getAuth } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Navigation } from "./Navigation";
import { LoadAnimation } from "./LoadAnimation"


export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    
    if (loading) {
        return <LoadAnimation />
    } 
    return user ? (<><Navigation />{children}</>) : (<Navigate to="/signin" state={{from: location}} />)  
}

ProtectedRoute.propTypes = {
    children: PropTypes.node
}

