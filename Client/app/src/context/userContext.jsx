import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext(undefined);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const Auth_token = localStorage.getItem('Auth_token');

      console.log('Token from cookie:', Auth_token);

      if (!Auth_token) {
        throw new Error('Authorization token is missing.');
      }


      const { data, status  } = await axios.get("/profile", {
        headers: {
          'Authorization': `Bearer ${Auth_token}`
        }
    });

    if (status === 200){
      setUser(data);
    }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch user profile.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const {status} = await axios.post('/logout');
      if (status === 200){
      localStorage.removeItem('Auth_token');
      setUser(null);
      window.location.reload();
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out.');
    }
  };
  return (
    <UserContext.Provider value={{user, setUser,fetchProfile, logout}}>
      {children}
    </UserContext.Provider>
  );
}
