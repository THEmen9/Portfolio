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
        <div className="mt-4">

          <h2 className="text-2xl font-bold">
            {project.title}
          </h2>

          <p className="mt-2">
            {project.description}
          </p>

          {/* Images */}
          <div className="grid gap-4 mt-6">
            {project.images?.map((image) => (
              <img
                key={image}
                src={image}
                alt={`${project.title}`}
                className="w-full rounded"
              />
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">
              Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Live Demo
              </a>
            )}

          </div>

        </div>
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