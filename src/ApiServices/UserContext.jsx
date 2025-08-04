import React, { createContext, useContext, useState } from 'react';

// 1. Create context
const UserContext = createContext();

// 2. Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user will contain avatar, fullName, etc.

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook to use context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
