export type AuthUser = {
  id: number;
  userid: string;
};

type StoredAuth = {
  user: AuthUser;
  loggedInAt: string;
};

const AUTH_STORAGE_KEY = "bfsi-auth-user";

const getStorage = (persist: boolean) =>
  persist ? window.localStorage : window.sessionStorage;

export const saveAuthUser = (user: AuthUser, persist: boolean) => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);

  const payload: StoredAuth = {
    user,
    loggedInAt: new Date().toISOString(),
  };

  getStorage(persist).setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
};

export const getStoredAuth = (): StoredAuth | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue =
    window.localStorage.getItem(AUTH_STORAGE_KEY) ??
    window.sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as StoredAuth;
  } catch {
    clearStoredAuth();
    return null;
  }
};

export const isAuthenticated = () => Boolean(getStoredAuth()?.user);

export const clearStoredAuth = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
};
