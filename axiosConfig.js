import axios from 'axios';
import { useDispatch } from 'react-redux';  // Assumindo que você usa Redux para o fetchLogout
import { fetchLogout } from './slices/auth';
import { getSession } from 'next-auth/react';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your API base URL
    timeout: 500000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosInstance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      //console.log("axios")
      //console.log(session)
      if (session?.accessToken){
        config.headers.Authorization = `${session.accessToken}`
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /*
// Interceptor de resposta para lidar com erros 401
axiosInstance.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, apenas retorna a resposta
    return response;
  },
  async (error) => {
    const dispatch = useDispatch();  // Hook do Redux para disparar ações

    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // Caso o erro ocorra em uma tentativa de renovar o token, fazer logout
      if (originalRequest.url === '/admin/user/refreshToken') {
        dispatch(fetchLogout());  // Despacha a ação de logout
        return Promise.reject(error);
      }

      // Tentar renovar o token
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('/admin/user/refreshToken', { refreshToken });
          const { token, refreshToken } = response.data;
          
          // Atualizar localStorage com o novo token e refreshToken
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          // Atualizar o header Authorization e refazer a requisição original
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Se a tentativa de renovação do token falhar (por ex., com 401), fazer logout
        dispatch(fetchLogout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
  */
  export default axiosInstance;