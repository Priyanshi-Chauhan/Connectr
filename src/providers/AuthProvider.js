import {createContext} from 'react';
import {useProvideAuth} from '../hooks';

const initialState = {
    user : null, 
    login : () => {},
    logout : () => {},
    loading : true, 
    signup : () => {}, 
    updateUser : () => {},    
    updateUserFriends : () => {}
    // usersInfo k liye yaha kuch nhi likhenge , because userInfo is not a part of auth 
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) =>{
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
