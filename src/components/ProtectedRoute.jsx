import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from "../config/api";


export default function ProtectedRoute({ element }) {
  const [isAuth, setIsAuth] = useState(null);
  
  useEffect(() => {
    console.log('ProtectedRoute checking token...');
  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admn/verify-token`, {
        credentials: "include",
      });
      
      const data = await response.json();
      setIsAuth(data.valid);
    } catch (err) {
      setIsAuth(false);
    }
  };
  
  verifyToken();
}, []);
  
  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;
  return element;
}