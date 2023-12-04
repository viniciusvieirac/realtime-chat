import { UpdateUser } from '@/interfaces/userInterface';
import axios from 'axios';
import { get } from 'http';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint: string, body: any) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    throw error;
  }
};

export const requestRegister = async (endpoint: string, body: any) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getUserByToken = async (endpoint: string, authToken: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };
    const { data } = await api.get(endpoint, config);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getUserByName = async (endpoint: string, authToken: string, username: string) => {
  try {
    const config = {
      headers: {
        username: username,
        Authorization: `Bearer ${authToken}`
      }
    };
    const { data } = await api.get(endpoint, config);
    return data;
  } catch (error) {
    throw error;
  }
}

export const updateUser = async (authToken: string, body: any) => {
  try {
    const userData = await getUserByToken('/user/data', authToken);
    const userId = userData.id;
    const updatedUser: UpdateUser = {};

    if (body.description !== undefined) {
      updatedUser['description'] = body.description;
    }

    if (body.imageUrl !== undefined) {
      updatedUser['imageUrl'] = body.imageUrl;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    const { data } = await api.put(`/${userId}`, updatedUser, config);
    return data;
  } catch (error) {
    throw error;
  }
};


export default api;