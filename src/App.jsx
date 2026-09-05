import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';
import ProtectedRoute from "./components/ProtectedRoute";

import {
  About,
  Contact,
  Projects,
  Home,
  ProjectDetail,
  Login,
  AdminDashboard,
  ProjectForm
} from "./pages/index.js";


export default function App() {
  const [isAuth, setIsAuth] = useState(false);

//--------darkmodeToggle-----------------//
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  function toggleTheme() {
    setIsDark(!isDark);
  }
    
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/verify-token", {
          credentials: "include",
        });
        const data = await response.json();
        setIsAuth(data.valid);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden'>

    {/* Global blobs - fixed background*/}
      <div className="absolute w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 -z-10 top-0 left-0" />
      <div className="absolute w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 -z-10 bottom-0 right-0" />
    {/* Header */}
    <Header name="Mr Ankit" isDark={isDark} toggleTheme={toggleTheme} isAuth={isAuth} setIsAuth={setIsAuth} /> 
    {/* Main Content */}
    <main className="max-w-4xl mx-auto px-4 space-y-6">
      <Routes>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard isDark={isDark}/>} />} />
        <Route path="/" element={<Home isDark={isDark} />} />
        <Route path="/about" element={<About isDark={isDark} />} />
        <Route path="/projects" element={<Projects isDark={isDark} />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact email="ankitsmi.7557@gmail.com" isDark={isDark} />} />
        <Route path="/admin/edit/:id" element={<ProjectForm isDark={isDark}/>} />
        <Route path="/admin/add" element={<ProjectForm isDark={isDark} />} />
      </Routes>
    </main>
    
      <Footer isDark={isDark} />
    </div>
  )
}


