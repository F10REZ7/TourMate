import React, {createContext, useState, useEffect, useContext, Children} from 'react';

// se usa contextAPI para crear un estado global evitando pasar manualmente datos entre componentes
// creamos el contexto
const AuthContext = createContext();

// creamos el proveedor que envolvera la app
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // al cargar la app, verificamos si ha una sesion guardada
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // funcion para iniciar sesion
    const login = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
    };

    // funcion para cerrar sesion
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    if(loading) return null; //evita parpadeos localstorage

    return (
        <AuthContext.Provider value ={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
// hook para usar el contexto
export const useAuth = () => useContext(AuthContext);