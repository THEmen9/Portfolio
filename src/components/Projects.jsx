import React from 'react'

 export default function Projects({projects}) {
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
       <h2 >Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className='mb-4 border bg-gray-100 dark:bg-gray-800 p-2'>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
}

 