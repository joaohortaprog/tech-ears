import axios from 'axios';


const customTechEarsNodeRedAxios = axios.create({
  baseURL: 'http://localhost:1880',
});

// Adicione um interceptor de requisição
customTechEarsNodeRedAxios.interceptors.request.use(
  (config) => {
    // Obtenha o token do localStorage
    const token = localStorage.getItem('token');

    // Se o token existir, adicione ao header Authorization
    if (token) {
      config.headers.token = `${token}`;
      config.headers.userid = localStorage.getItem('idUsuarioLogado');
    }

    return config;
  },
  (error) => {
    // Lida com o erro de requisição
    return Promise.reject(error);
  }
);

export default customTechEarsNodeRedAxios;
