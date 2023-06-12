import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { useLocalStorage } from '../services/localStorageService';
import { UserEntity } from '../models/UserEntity';

// Define el tipo de contexto
type AuthContextType = {
  user: UserEntity | null;
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
  const [user, setUser] = useState<UserEntity | null>(null);

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // Función de inicio de sesión
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Lógica de autenticación (puede ser una solicitud a la API, etc.)
    const user: UserEntity = {
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
    const user: UserEntity = {
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
