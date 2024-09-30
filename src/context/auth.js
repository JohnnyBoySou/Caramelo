import React, { createContext, useState } from 'react';

// Crie o contexto
const AuthContext = createContext();

// Crie o provedor de contexto
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Função para fazer login
    const login = (username, password) => {
        // Lógica de autenticação aqui
        // ...

        // Defina o usuário autenticado
        setUser({ username });
    };

    // Função para fazer logout
    const logout = () => {
        // Lógica de logout aqui
        // ...

        // Remova o usuário autenticado
        setUser(null);
    };

    // Valor do contexto
    const authContextValue = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };