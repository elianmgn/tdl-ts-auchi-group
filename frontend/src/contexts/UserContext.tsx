import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import useLocalStorage from '../services/localStorageService';
import useApiService from '../services/apiService';
import { UserEntity } from '../models/UserEntity';
import jwtDecode from 'jwt-decode';
import { SnackbarContext } from './SnackbarContext';

const secondsToMillisecondsMultiplier = 1000;

type JWTToken = {
  foo: string;
  exp: number;
  iat: number;
};

// Define el tipo de contexto
type UserContextType = {
  currentUser: UserEntity | null;
  userToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  signup: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => void;
  logout: () => void;
};

// Crea el contexto de autenticación
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  userToken: null,
  isLoading: false,
  login: async () => {
    // Do nothing
  },
  signup: () => {
    // Do nothing
  },
  logout: () => {
    // Do nothing
  },
});

// Crea el componente proveedor del contexto
export const UserProvider: React.FC<BrowserRouterProps> = ({ children }) => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { setItem, getItem, removeItem } = useLocalStorage();
  const { loginUser, registerUser } = useApiService();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  const tokenTimerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Checks whether user is logged in when 'userToken' changes
    isLoggedIn();

    return () => {
      clearTokenTimer();
    };
  }, [userToken]);

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
      showSnackbar('Your session has expired', 'warning');
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

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const retrievedUserToken = getItem('userToken');
      const user = getItem('currentUser');

      if (retrievedUserToken && user) {
        setUserToken(retrievedUserToken);
        setCurrentUser(JSON.parse(user));
        startTokenTimer(retrievedUserToken);
      } else {
        logout();
        clearTokenTimer();
      }

      setIsLoading(false);
    } catch (e) {
      console.error(`<isLoggedIn in error> ${e}`);
      logout();
    }
  };

  // Función de inicio de sesión
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    // Lógica de autenticación
    const userData = await loginUser(username, password);
    if (!userData) {
      showSnackbar('Wrong username or password', 'error');
      setIsLoading(false);
      return;
    }
    setCurrentUser(userData);
    startTokenTimer(userData.access_token);
    setItem('userToken', JSON.stringify(userData.access_token));
    setItem('currentUser', JSON.stringify(userData));
    setIsLoading(false);
  };

  // Función de registro
  const signup = async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => {
    setIsLoading(true);
    // Lógica de registro
    const userData = await registerUser(username, password, email, firstName, lastName);
    console.log(userData);
    if (!userData) {
      showSnackbar('Error registering user', 'error');
      setIsLoading(false);
      return;
    }
    login(username, password);
  };

  // Función de cierre de sesión
  const logout = () => {
    setIsLoading(true);
    clearTokenTimer();
    setCurrentUser(null);
    removeItem('userToken');
    removeItem('currentUser');
    setIsLoading(false);
  };

  return (
    <>
      <UserContext.Provider value={{ currentUser, userToken, isLoading, login, logout, signup }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
