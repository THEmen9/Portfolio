import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Button from '../components/Button.jsx';


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
        </>
      );
    } else {
       console.log(project.images);
      content = (
      <>
        <div className="relative z-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-md border
        border-white/20 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-center mb-8"
            style={{
                backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
                  }}
            >
              {project.title}
          </h2>

          <p className="mt-2">
            {project.description}
          </p>

          {/* Images */}
          <div className="flex flex-col gap-8 my-8">
            {[...project.images].reverse().map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-lg w-full md:w-2/3 ${
                  index % 2 === 0 ? "self-start" : "self-end"
                }`}
              >
                <img
                  src={image}
                  alt={project.title}
                  className="w-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-center mb-8"
              style={{
                  backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
            >
              Tech Stack
            </h3>

            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {project.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs bg-white/10 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between mt-6">

            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer">
                <Button size="md" className="bg-primary text-white hover:bg-primary/90">
                  GitHub
                </Button>
              </a>
            )}

            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer">
                <Button size="md" className="bg-primary text-white hover:bg-primary/90">
                  Live Demo
                </Button>
              </a>
            )}

          </div>

        </div>
      </>
    );
  }

  return (
    <section className="min-h-screen px-4 py-16">
      <div className="mb-6">
      <Link to="/projects">
          <Button size="md" className="bg-primary text-white hover:bg-primary/90">
             ← Back to Projects
          </Button>
        </Link>
      </div>
      {content}
    </section>
  );
}