import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ProjectDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState();

  useEffect(() => {
    async function fetchProject() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/projects/${id}`);
          if (!response.ok) {
              throw new Error(`Server error: ${response.status}`);
            }
        const data = await response.json();
        setProject(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [id])

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