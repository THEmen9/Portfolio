import React, { useState, useEffect } from 'react'

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   async function fetchAbout() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/about');
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
        const data = await response.json();
        setAboutData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Bio. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  fetchAbout();
  }, [])

  let content;

  if (isLoading) {
    content = <p>Loading content...</p>;
  } else if (error) {
    content = <p className='text-red-500'>{error}</p>;
  } else {
    content = <p>{aboutData.bio}</p>;
  }
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
        {content}
    </section>
  )
}

