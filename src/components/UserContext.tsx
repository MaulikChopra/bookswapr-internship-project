'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Define the user type
type User = {
  id: number;
  role: string;
};

// Define the context type
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Create a provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
        // Load user from localStorage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        // Update localStorage when user changes
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
