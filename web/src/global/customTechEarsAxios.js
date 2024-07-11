import axios from 'axios';


const customTechearsAxios = axios.create({
  baseURL: 'http://localhost:8911/graphql',
});

// Adicione um interceptor de requisição
customTechearsAxios.interceptors.request.use(
  (config) => {
    // Obtenha o token do localStorage
    const token = localStorage.getItem('token');

    // Se o token existir, adicione ao header Authorization
    if (token) {
      config.headers.token = `${token}`;
    }

    return config;
  },
  (error) => {
    // Lida com o erro de requisição
    return Promise.reject(error);
  }
);

export default customTechearsAxios;
