import React, {useState, useEffect} from 'react'

import {
  Header,
  About,
  Contact,
  Projects,
} from "./components";

// projects
const projectsData = [
  { id: 1, title: 'Project One', description: 'A short description here.' },
  { id: 2, title: 'Project Two', description: 'Another short description.' },
];

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
    <div className='max-w-4xl mx-auto space-y-6 px-4'>
      <Header name="Mr Ankit" isDark={isDark} toggleTheme={toggleTheme}/>
      <About bio="I am a developer learning React." isDark={isDark} />
      <Projects projects={projectsData} isDark={isDark} />
      <Contact email="ankitsmi.7557@gmail.com" isDark={isDark} />
    </div>
  )
}


