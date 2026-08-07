import React from 'react';
import { projectsData } from '../data/content';
import { Link } from 'react-router-dom';

 export default function Projects() {
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
       <h2 >Projects</h2>
      {projectsData.map((project) => (
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

 