import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'


export default function ProjectDetail() {
  const {id} = useParams()
  const { data: project, isLoading, error } = useFetch(`http://localhost:5000/api/projects/${id}`);

 let content;
  if (isLoading) {
    content = <p>Loading Project...</p>;
  } else if (error) {
    content = (
      <>
        <p className="text-red-500">{error}</p>
        <Link to="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </>
    );
  } else {
    content = (
      <>
        <h2 className="text-2xl font-bold mt-2">{project.title}</h2>
        <p className="mt-2">{project.description}</p>
      </>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <Link to="/projects" className="text-blue-600 hover:underline">
        ← Back to Projects
      </Link>
      {content}
    </section>
  );
}