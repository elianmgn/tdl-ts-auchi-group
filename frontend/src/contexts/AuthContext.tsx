import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { useLocalStorage } from '../services/localStorageService';

// Define el tipo de usuario
type User = {
  email: string;
  name: string;
  userToken?: string;
  profileUrl?: string;
};

// Define el tipo de contexto
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  isLoading: boolean;
};

// Crea el contexto de autenticación
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {
    //Do nothing
  },
  logout: () => {
    //Do nothing
  },
  register: () => {
    //Do nothing
  },
  isLoading: false,
});

// Crea el componente proveedor del contexto
export const AuthProvider: React.FC<BrowserRouterProps> = ({ children }) => {
  const { setItem, getItem, removeItem } = useLocalStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // Función de inicio de sesión
  const login = (email: string, password: string) => {
    setIsLoading(true);
    // Lógica de autenticación (puede ser una solicitud a la API, etc.)
    const user: User = {
      email,
      name: 'John Doe',
    };
    setUser(user);
    setItem('user', JSON.stringify(user));
    setIsLoading(false);
  };

  // Función de registro
  const register = (email: string, password: string, name: string) => {
    setIsLoading(true);
    // Lógica de registro (puede ser una solicitud a la API, etc.)
    const user: User = {
      email,
      name,
    };
    login(email, password);
  };

  // Función de cierre de sesión
  const logout = () => {
    setUser(null);
    removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
