import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'

 export default function Projects() {
    const { data: projects, isLoading, error } = useFetch("http://localhost:5000/api/projects");

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

 