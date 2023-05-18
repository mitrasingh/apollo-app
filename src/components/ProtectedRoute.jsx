import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { Navigation } from "./Navigation";

export const ProtectedRoute = ({ children }) => {
    
    const user = useSelector((state) => state.user.user);
    
    if (!user) {
        return <Navigate to="/signin" replace />
    }
    
    return (
        <>
        <Navigation />
        {children}
        </>
        
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.node
}


// import { Navigation } from './Navigation';
// import { Home } from '../pages/Home';
// import { SignIn } from '../pages/SignIn';

    // <>
    //     {user ? (<><Navigation /> <Home /></>) : <SignIn />}
    // </>

// import { LoadAnimation } from './LoadAnimation';
// const isLoading = useSelector((state) => state.data.user.isLoading);
// {isLoading ? (<LoadAnimation />) : (<>{user ? (<><Navigation /> <Home /></>) : <SignIn />}</>) }
