import { store } from "@/store";

export function isAdmin() {
  const authenticate = store.getState().authentication
  if (authenticate.user?.role == 'admin') {
    return true;
  } 

  return false;
}

export function isModerator() {
  const authenticate = store.getState().authentication
  if (authenticate.user?.role == 'admin' || authenticate.user?.user_organization?.is_manager) {
    return true;
  } 

  return false;
}