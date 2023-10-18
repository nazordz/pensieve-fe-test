import { LoginResponse, User } from "@/models"
import { store } from "@/store";
import { setAuthenticationData, logout } from "@/store/slices/authenticationSlice";
import http from "@/utils/http"
import jwtDecode from "jwt-decode";

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  user: User;
}

async function signIn(email: string, password: string): Promise<User|null> {
  try {
    const req = await http.post<LoginResponse>('/auth/login', {
      email, password
    })
    
    const { user } = jwtDecode<JwtPayload>(req.data.access_token);
    
    store.dispatch(setAuthenticationData({
      accessToken: req.data.access_token,
      refreshToken: req.data.refresh_token,
      user: user
    }))
    return user;
    
  } catch (error) {
    console.log(error);
    return null;
  }
}

function signOut() {
  try {
    store.dispatch(logout());
    return true;
  } catch (error) {
    return false;
  }
}

export {
  signIn, signOut
}