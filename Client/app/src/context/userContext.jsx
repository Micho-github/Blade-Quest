import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

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
      const token = Cookies.get('token');
      console.log('Token from cookie:', token);

      if (!token) {
        throw new Error('Authorization token is missing.');
      }

      const { data } = await axios.get("/profile");
      setUser(data);
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
      await axios.post('/logout');
      setUser(null);
      window.location.reload();
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
