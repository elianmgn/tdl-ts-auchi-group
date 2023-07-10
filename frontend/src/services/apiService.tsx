import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import TransactionEntity from '../models/TransactionEntity';
import { SnackbarContext } from '../contexts/SnackbarContext';
const API_URL = 'http://localhost:8080';

const useApiService = () => {
  const { currentUser } = useContext(UserContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const headerConfig = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${currentUser?.access_token}`,
  };

  const loginUser = async (username: string, password: string) => {
    const url = `${API_URL}/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        showSnackbar(responseJSON.message, 'error');
        return null;
      }
      return responseJSON;
    } catch (e) {
      console.error(e);
    }
  };

  const registerUser = async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => {
    const url = `${API_URL}/user`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, firstName, lastName }),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        showSnackbar(responseJSON.message, 'error');
        return null;
      }
      return responseJSON;
    } catch (e) {
      console.error(e);
    }
  };

  const getUserBalance = async (params: Record<string, string> | null = null) => {
    if (!params) {
      params = {};
    }
    const qparams = new URLSearchParams(params).toString();
    const url = `${API_URL}/user/balance/${currentUser?.username}?${qparams}`;
    return await fetch(url, {
      method: 'GET',
      headers: headerConfig,
    });
  };

  const getUserCategories = async (params: Record<string, string> | null = null) => {
    // Fetch categories from API
    if (!params) {
      params = {};
    }
    const qparams = new URLSearchParams(params).toString();
    try {
      const url = `${API_URL}/categories/${currentUser?.username}?${qparams}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: headerConfig,
      });
      const categoriesData = await response.json();
      return categoriesData;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const postUserCategory = async (body: string) => {
    // Post category to API and return response. Body is a JSON string.
    const url = `${API_URL}/categories/${currentUser?.username}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: headerConfig,
      body: body,
    });
    console.log(response)
    console.log(response.json());
    return response;
  };

  const putUserCategory = async (id: string, body: string) => {
    // Put category to API and return response. Body is a JSON string.
    const url = `${API_URL}/categories/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: headerConfig,
      body: body,
    });
    return response;
  };

  const deleteUserCategory = async (id: string) => {
    // Delete category to API and return response.
    const url = `${API_URL}/categories/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headerConfig,
    });
    return response;
  };

  const getUserTransactions = async (params: Record<string, string> | null = null) => {
    if (!params) {
      params = {};
    }
    const qparams = new URLSearchParams(params).toString();

    const url = `${API_URL}/transactions/${currentUser?.username}?${qparams}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: headerConfig,
    });
    const transactionsData: Promise<TransactionEntity[]> = await response.json();
    return transactionsData;
  };

  const postUserTransaction = async (body: string) => {
    // Post transaction to API and return response. Body is a JSON string.
    const url = `${API_URL}/transactions/${currentUser?.username}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: headerConfig,
      body: body,
    });
    return response;
  };

  const putUserTransaction = async (id: string, body: string) => {
    // Put transaction to API and return response. Body is a JSON string.
    const url = `${API_URL}/transactions/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: headerConfig,
      body: body,
    });
    return response;
  };

  const deleteUserTransaction = async (id: string) => {
    // Delete transaction to API and return response.
    const url = `${API_URL}/transactions/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headerConfig,
    });
    return response;
  };

  return {
    loginUser,
    registerUser,
    getUserBalance,
    getUserCategories,
    postUserCategory,
    putUserCategory,
    deleteUserCategory,
    getUserTransactions,
    postUserTransaction,
    putUserTransaction,
    deleteUserTransaction,
  };
};

export default useApiService;
