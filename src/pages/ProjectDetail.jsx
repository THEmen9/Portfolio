import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsData } from '../data/content';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
        <p>Project not found.</p>
        <Link to="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <Link to="/projects" className="text-blue-600 hover:underline">
        ← Back to Projects
      </Link>
      <h2 className="text-2xl font-bold mt-2">{project.title}</h2>
      <p className="mt-2">{project.description}</p>
    </section>
  );
}