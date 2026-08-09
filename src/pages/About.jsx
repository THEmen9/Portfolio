import React, { useState, useEffect } from 'react'
import  {aboutContent}  from '../data/content';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() =>{
      const didFail = Math.random() < 0.5; // 50% chance of failure
      
            if(didFail) {
              setError('Failed to load Bio. Please try again later.');
            }else{
              setAboutData(aboutContent);
              setError(null);
            }
            setIsLoading(false);
          }, 500);
      
    return () => clearTimeout(timer);
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

