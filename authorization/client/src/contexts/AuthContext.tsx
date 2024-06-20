// auth-context.js
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  lastUrl: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  recordLastUrl: (url: string) => void;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  lastUrl: "",
  login: async (_username, _password) => {},
  logout: async () => {},
  recordLastUrl: (_url) => {},
};

export const AuthContext = createContext(defaultAuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastUrl, setLastUrl] = useState(""); // 记录上次访问的 URL
  const navigate = useNavigate();

  const recordLastUrl = (url: string) => {
    console.log("recordLastUrl", url);
    setLastUrl(url);
  };

  const login = async (username: string, password: string) => {
    try {
      // 执行登录逻辑,例如向服务器发送请求
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 登录成功,执行相应操作
        setIsAuthenticated(true);

        console.log("lastUrl", lastUrl);
        if (lastUrl) {
          navigate(lastUrl);
        } else {
          navigate("/");
        }
      } else {
        // 登录失败,处理错误
        throw new Error(data.error);
      }
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };

  const logout = async () => {
    // 执行登出逻辑
    // ...
    console.log("logout logic");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, lastUrl, login, logout, recordLastUrl }}>
      {children}
    </AuthContext.Provider>
  );
};
