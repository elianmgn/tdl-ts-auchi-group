import React, { createContext, useState, useEffect, useRef } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import useLocalStorage from '../services/localStorageService';
import { UserEntity } from '../models/UserEntity';
import jwtDecode from 'jwt-decode';

const secondsToMillisecondsMultiplier = 1000;

type JWTToken = {
  foo: string;
  exp: number;
  iat: number;
}

// Define el tipo de contexto
type UserContextType = {
  currentUser: UserEntity | null;
  login: (username: string, password: string) => Promise<Response>;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  isLoading: boolean;
};

// Crea el contexto de autenticación
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  login: async () => {
    return new Promise(() => {
      // Do nothing
    });
  },
  register: () => {
    // Do nothing
  },
  logout: () => {
    // Do nothing
  },
  isLoading: false,
});

// Crea el componente proveedor del contexto
export const UserProvider: React.FC<BrowserRouterProps> = ({ children }) => {
  const { setItem, getItem, removeItem } = useLocalStorage();

  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);

  const tokenTimerIdRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    setIsLoading(true);
    const user = getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setIsLoading(false);
  }, []);

  function startTokenTimer(token: string) {
    clearTokenTimer();

    const decodedToken: JWTToken = jwtDecode(token);

    const currentDate = new Date();
    // Calculamos el tiempo que debe durar el token como la diferencia
    // entre su hora de expiracion y la hora actual (en milisegundos)
    const tokenExpirationTime =
      decodedToken.exp * secondsToMillisecondsMultiplier - currentDate.getTime();

    tokenTimerIdRef.current = setTimeout(async () => {
      // Si se llega al timeout lanzamos la alerta y hacemos el logout
      console.log('Your session has expired');
      logout();
    }, tokenExpirationTime);
  }

  function clearTokenTimer() {
    // Accedemos al ID del timer activo, si lo hubiera
    const tokenTimerId = tokenTimerIdRef.current;

    // Si hay un timer activo
    if (tokenTimerId) {
      // Lo limpiamos
      clearTimeout(tokenTimerId);
      // Y establecemos la referencia del ID de timer a null
      tokenTimerIdRef.current = null;
    }
  }

  // Función de inicio de sesión
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    // Lógica de autenticación
    const url = `http://localhost:8080/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const userData: UserEntity = await response.json();

    setCurrentUser(userData);
    startTokenTimer(userData.access_token);
    setItem('user', JSON.stringify(userData));
    setIsLoading(false);
    return response;
  };

  // Función de registro
  const register = (username: string, password: string) => {
    setIsLoading(true);
    // Lógica de registro (puede ser una solicitud a la API, etc.)

    login(username, password);
  };

  // Función de cierre de sesión
  const logout = () => {
    setIsLoading(true);
    clearTokenTimer();
    setCurrentUser(null);
    removeItem('user');
    setIsLoading(false);
  };

  return (
    <>
      <UserContext.Provider value={{ currentUser, login, logout, register, isLoading }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
