import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';

import {
  About,
  Contact,
  Projects,
  Home,
  ProjectDetail
} from "./pages/index.js";


export default function App() {
// darkmodeToggle

  const[isDark, setIsDark]=useState(false)

  function toggleTheme() {
    setIsDark(!isDark);
  }
    
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]); 

  return (
    <div className='min-h-screen'>
      <Header name="Mr Ankit" isDark={isDark} toggleTheme={toggleTheme}/> 

    <main className="max-w-4xl mx-auto px-4 space-y-6">
      <Routes>
        <Route path="/" element={<Home isDark={isDark} />} />
        <Route path="/about" element={<About isDark={isDark} />} />
        <Route path="/projects" element={<Projects isDark={isDark} />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact email="ankitsmi.7557@gmail.com" isDark={isDark} />} />
      </Routes>
    </main>
    
      <Footer isDark={isDark} />
    </div>
  )
}


