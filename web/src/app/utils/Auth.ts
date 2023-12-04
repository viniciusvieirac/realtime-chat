import axios from 'axios';

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
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const requestRegister = async (endpoint: string, body: any) => {
  try {
    const { data } = await api.post(endpoint, body);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getUserByToken = async (endpoint: string, authToken: string) => {
  try {
    console.log(authToken);
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
    console.log(authToken);
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


export default api;