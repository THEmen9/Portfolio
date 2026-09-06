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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project._id}`}>
              <div className="group border border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl 
              p-3 mb-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                
                <div className="aspect-square overflow-hidden rounded-xl">
                  {project.images?.length > 0  && (
                    <img
                      src={[...project.images].reverse()[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform 
                      duration-300"
                    />
                  )}
                </div>

                <h3 className="text-lg font-semibold mt-3">{project.title}</h3>

                <p className="text-sm mt-1 line-clamp-2">{project.description}</p>

                {/* <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs bg-white/10 rounded">
                      {tech}
                    </span>
                  ))}
                </div> */}

              </div>
            </Link>
          ))}
          </div>
        </>
       )
     }
    return (
    <>
      {showLoader && <IntroLoader />}

      {/* Hero section */}
      <section className="relative overflow-hidden py-20 px-4">

        {/* Glass card - actual content */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl 
        p-8 lg:p-12">
  
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* LEFT: Text content */}
            <div className="flex-1 text-left order-2 lg:order-1">
              
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 
              bg-white/5 px-4 py-1.5 text-xs mb-6">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-muted-foreground uppercase tracking-wide">Available for work</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight 
              mb-4" 
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Mr. Ankit
              </h1>

              <p className="text-sm mb-6 max-w-xl">
               I'm a full-stack developer specializing in the MERN stack, building performant web applications 
               with React, Node.js, Express, and MongoDB. From RESTful API design to responsive, component-driven
               UIs, I focus on writing clean, scalable code — with hands-on experience in authentication, cloud media 
               handling, and real-world deployment workflows.
              </p>

              <Link to="/projects">
                <Button size="md" className="bg-primary text-white">View My Work</Button>
              </Link>
            </div>

            {/* RIGHT: Portrait image */}
            <div className="shrink-0 order-1 lg:order-2">
              <img 
                src={profilePic} 
                alt="Mr. Ankit"
                className="w-64 h-80 lg:w-72 lg:h-96 object-cover rounded-xl"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
                }}
              />
            </div>

          </div>
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

