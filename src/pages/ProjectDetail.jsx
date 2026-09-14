import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Button from '../components/Button.jsx';
import { API_URL } from "../config/api";


export default function ProjectDetail() {
  const {id} = useParams()
  const { data: project, isLoading, error } = useFetch(`${API_URL}/api/projects/${id}`);
  
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
      content = (
      <>
        <div className="relative z-10 max-w-5xl mx-auto bg-muted/40 backdrop-blur-md border
        border-border rounded-2xl p-8">

          <h1 className="text-3xl font-bold uppercase tracking-widest text-center mb-8"
            style={{
                backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
                  }}
            >
              {project.title}
          </h1>

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
            <h3 className="text-2xl font-bold uppercase tracking-wider text-center mb-8"
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
                  className="inline-flex items-center rounded-full border border-border 
                  bg-muted/40 px-3 py-1 text-xs hover:border-primary/50 hover:bg-primary/10 transition-colors 
                  duration-300"
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
                <Button size="md" className="rounded-md px-3 py-1.5 bg-muted/40 border border-border 
                backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
                >
                  GitHub
                </Button>
              </a>
            )}

            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer">
                <Button size="md" className="rounded-md px-3 py-1.5 bg-muted/40 border border-border 
                backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
                >
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
    <section className="relative overflow-hidden space-y-10 p-4">
      <div className="mb-6">
      <Link to="/projects">
          <Button 
          size="md" 
          className="rounded-md px-3 py-1.5 bg-muted/40 border border-border 
          backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300">
             ← Back to Projects
          </Button>
        </Link>
      </div>
      {content}
    </section>
  );
}