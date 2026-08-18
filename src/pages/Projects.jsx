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
            <Link key={project._id} to={`/projects/${project._id}`}>
              <div className='mb-4 border bg-gray-100 dark:bg-gray-800 p-2 hover:opacity-80 transition'>
                
                {project.images?.[0] && (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}

                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="mt-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack?.map((tech) => (
                    <span
                      className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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

 