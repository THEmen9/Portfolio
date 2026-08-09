import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/content';
import { Link } from 'react-router-dom';

 export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   const timer = setTimeout(() => {
    const didFail = Math.random() < 0.5; // 50% chance of failure

      if(didFail) {
        setError('Failed to load projects. Please try again later.');
      }else{
        setProjects(projectsData);
        setError(null);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

   let content;
   if(isLoading) {
    content = <p>Loading Projects...</p>;
   }else if (error) {
    content = <p className='text-red-500'>{error}</p>
   }else {
    content = (
      <>
      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <div className='mb-4 border bg-gray-100 dark:bg-gray-800 p-2 hover:opacity-80 transition'>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        </Link>
      ))}
      </>
    )
   }
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
       <h2 >Projects</h2>
       {content}
    </section>
  );
}

 