import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

// function to grab our context
export const useAuth = () => {
    return useContext(AuthContext);
}; // gives us access to the data we can find inside the value object for the provider

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    // call useEffect hook when we re-navigate or add a user
    useEffect(() => {
        // observes changes in user's sign-in state
        // upon successful sign-in, we update the state variables accordingly
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                history.push('/chats'); // navigate to the chats page ONLY if we have the user
            }
        });
    }, [user, history]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
