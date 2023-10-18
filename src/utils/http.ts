import { LoginResponse } from "@/models";
import { JwtPayload } from "@/services/AuthenticationService";
import { store } from "@/store";
import { setAuthenticationData } from "@/store/slices/authenticationSlice";
import axios from "axios";
import jwtDecode from "jwt-decode";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API
});

http.interceptors.request.use(function(config) {
  const tokenState = store.getState().authentication.accessToken;
  if (tokenState && config.headers) {
    config.headers.Authorization = `Bearer ${tokenState}`
  }
  
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorName = error.response.data.name
    const config = error?.config;
    
    if (errorName == 'TokenExpiredError') {
      const refreshToken = store.getState().authentication.refreshToken;
      
      config.sent = true;

      try {
        const response = await axios.post<LoginResponse>(import.meta.env.VITE_BASE_API + "/auth/refresh", {
          refreshToken
        });
        
        const data = response.data;
        const { user } = jwtDecode<JwtPayload>(data.access_token);
        
        store.dispatch(setAuthenticationData({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          user 
        }));

        if (data) {
          config.headers['Authorization'] = 'Bearer ' + data.access_token
        }
        return axios(config);
      } catch (error) {
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }
    return Promise.reject(error);
  }
)

export default http;
