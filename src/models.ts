export interface User {
  user_id: string;
  name: string;
  email: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface Device {
  device_id: string;
  device_type: string;
}

export interface Gps extends Device {
  id: number;
  timestamp: string;
  location: string;
}