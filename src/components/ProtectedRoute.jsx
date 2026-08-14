import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ element }) {
  const [isAuth, setIsAuth] = useState(null);
  
  useEffect(() => {
    console.log('ProtectedRoute checking token...');
  const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/verify-token", {
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