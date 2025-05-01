import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  checkingAuth: boolean;
  user: any;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); 

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
          } else {
            console.warn("Token expired");
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Invalid user data", error);
      }
    }
    setCheckingAuth(false); 
  }, []);

  const login = (userData: any) => {
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
