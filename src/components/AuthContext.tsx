import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next"; 

interface AuthContextType {
  isAuthenticated: boolean;
  checkingAuth: boolean;
  user: any;
  login: (payload: { token: string; user: any }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { t } = useTranslation(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const token = parsed?.token;

        if (token) {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          const exp = decoded.exp * 1000;

          if (Date.now() < exp) {
            setUser(parsed);
            setIsAuthenticated(true);

            const timeout = exp - Date.now();
            const timer = setTimeout(() => {
              logout();
              console.warn(t("auth.token_expired"));
            }, timeout);

            return () => clearTimeout(timer);
          } else {
            console.warn(t("auth.token_expired")); 
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error(t("auth.invalid_token"), error); 
      }
    }

    setCheckingAuth(false);
  }, [t]);

  const login = (payload: { token: string; user: any }) => {
    const userData = {
      ...payload.user,
      token: payload.token
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkingAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
