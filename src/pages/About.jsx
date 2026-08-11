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
    content = <p>{about.bio}</p>;
  }
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
        {content}
    </section>
  )
}

