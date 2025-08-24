import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = '';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ Children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users`, { email, password });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };
  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
};
