import { useEffect, useState } from 'react'

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [checkingStatus, setCheckingStatus] = useState(true);

    const user = JSON.parse(localStorage.getItem('user')!);
    
    useEffect(() => {
        if(user){
            setLoggedIn(true);
        }
        else{
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [user]);

    return {loggedIn, checkingStatus};
}

export default useAuthStatus