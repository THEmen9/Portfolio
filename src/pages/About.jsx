import React, { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

export default function About() {
  const { data: about, isLoading, error } = useFetch("http://localhost:5000/api/about");

  let content;

  if (isLoading) {
    content = <p>Loading content...</p>;
  } else if (error) {
    content = <p className='text-red-500'>{error}</p>;
  } else {
    content = <p className="whitespace-pre-line">{about.bio}</p>;
  }
  return (
    <section className="min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold text-center mb-8"
          style={{
              backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
        >
          About Me
        </h1>

        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 
        leading-relaxed">
          {content}
        </div>

      </div>
    </section>
  )
}

