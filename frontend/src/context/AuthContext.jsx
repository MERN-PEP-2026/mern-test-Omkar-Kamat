import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = (data) => ({
    ...data,
    id: data._id
  });

  const fetchMe = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(normalizeUser(res.data.data));
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      await api.post("/auth/login", data);
      const res = await api.get("/users/me");
      setUser(normalizeUser(res.data.data));
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const register = async (data) => {
    try {
      await api.post("/auth/register", data);
      const res = await api.get("/users/me");
      setUser(normalizeUser(res.data.data));
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };