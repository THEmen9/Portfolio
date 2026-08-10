import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

 export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/projects');
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  fetchProjects();
  }, []);

   let content;
    if(isLoading) {
      content = <p>Loading Projects...</p>;
    } else if (error) {
      content = <p className='text-red-500'>{error}</p>
    } else {
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

 