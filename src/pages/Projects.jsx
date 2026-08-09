import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/content';
import { Link } from 'react-router-dom';

 export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   const timer = setTimeout(() => {
      setProjects(projectsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
       <h2 >Projects</h2>

        {isLoading ? (
          <p>Loading projects...</p>
        ) : (
          <p>Here are some of my projects:</p>
        )}

      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <div className='mb-4 border bg-gray-100 dark:bg-gray-800 p-2 hover:opacity-80 transition'>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

 