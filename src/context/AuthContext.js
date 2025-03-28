import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        });

        return () => unsubscribe();
    }, [auth]);

    if (user === undefined){
        return <p>Carregando...</p>
    }

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
    return useContext(AuthContext);
}
