'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  authUser: authUserType;
  setAuthUser: React.Dispatch<React.SetStateAction<authUserType | null>>;
}

interface authUserType {
  fullName: string;
  id: string;
  profilePic: string;
  username: string;
}

interface ChildrenType {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

const AuthContextProvider = ({ children }: ChildrenType) => {
  const userValue =
    typeof window != 'undefined' ? localStorage.getItem('chat-user') : null;
  const user =
    typeof window != 'undefined' && typeof userValue === 'string'
      ? JSON.parse(userValue)
      : null;

  const [authUser, setAuthUser] = useState(user);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
