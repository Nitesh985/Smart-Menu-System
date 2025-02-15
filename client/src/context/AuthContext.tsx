import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

//TODO:Set the types for setLoading
const AuthContext = createContext<null | {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    }>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState()





  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useTableContext must be used within a AuthProvider");
  }
  return context;
}
