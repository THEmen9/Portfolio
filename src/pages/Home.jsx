import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import React,{useState, useEffect} from 'react';
import IntroLoader from '../components/IntroLoader.jsx';
import profilePic from '../assets/profile.jpeg';
import Button from '../components/Button.jsx';

export default function Home() {

const [showLoader, setShowLoader] = useState(() => {
  return !sessionStorage.getItem("hasSeenIntro");
});
  
const { data: projects, isLoading, error } = useFetch("http://localhost:5000/api/projects/featured");

useEffect(() => {
  if (!showLoader) return; 
    sessionStorage.setItem("hasSeenIntro", "true");
    const timer = setTimeout(() => setShowLoader(false), 5600);
    return () => clearTimeout(timer);
  }, []);

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
                <div className='mb-4 border bg-gray-100 dark:bg-gray-800
                 p-2 hover:opacity-80 transition'>
                  
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
                        key={tech}
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
    <>
      {showLoader && <IntroLoader />}

      {/* Hero section */}
      <section className="relative overflow-hidden py-20 px-4">

        {/* Glass card - actual content */}
        <div className="relative z-10 max-w-md mx-auto bg-white/10 backdrop-blur-md border
        border-white/20 rounded-2xl p-8 text-center">
          
          <img 
            src={profilePic} 
            alt="Mr. Ankit - Full Stack Developer" 
            className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">Mr. Ankit</h1>
          <p className="text-sm mb-6">
            I'm a full-stack developer specializing in the MERN stack, building performant web applications 
            with React, Node.js, Express, and MongoDB. From RESTful API design to responsive, component-driven
            UIs, I focus on writing clean, scalable code — with hands-on experience in authentication, cloud media 
            handling, and real-world deployment workflows.
          </p>
          <Link to="/projects">
            <Button size="md" className="bg-primary text-white">
              View My Work
            </Button>
          </Link>

        </div>
      </section>
      {/* Projects section */}
      <section className= "p-4">
         {content}
        <Link to="/contact">
            <Button size="md" className="bg-primary text-white">
              Connect With Me
            </Button>
          </Link>
      </section>
    </>

    );
}

