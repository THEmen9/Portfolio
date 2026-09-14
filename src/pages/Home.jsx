import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import React,{useState, useEffect} from 'react';
import IntroLoader from '../components/IntroLoader.jsx';
import profilePic from '../assets/profile.jpeg';
import { API_URL } from "../config/api";
import Button from '../components/Button.jsx';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, 
         SiJavascript, SiGit, SiShopify, SiCss , SiHtml5, SiCanvas } from "react-icons/si";

  // Skills array for the IconGrid component
    const skills = [
    { name: "React", Icon: SiReact, colorLight: "#61DAFB", colorDark: "#61DAFB" },
    { name: "Node.js", Icon: SiNodedotjs, colorLight: "#339933", colorDark: "#339933" },
    { name: "Express.js", Icon: SiExpress, colorLight: "#000000", colorDark: "#FFFFFF" },
    { name: "MongoDB", Icon: SiMongodb, colorLight: "#47A248", colorDark: "#47A248" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, colorLight: "#06B6D4", colorDark: "#06B6D4" },
    { name: "JavaScript", Icon: SiJavascript, colorLight: "#F7DF1E", colorDark: "#F7DF1E" },
    { name: "Git", Icon: SiGit, colorLight: "#F05033", colorDark: "#F05033" },
    { name: "Shopify", Icon: SiShopify, colorLight: "#96C93D", colorDark: "#96C93D" },
    { name: "CSS3", Icon: SiCss , colorLight: "#1572B6", colorDark: "#1572B6" },
    { name: "HTML5", Icon: SiHtml5, colorLight: "#E34C26", colorDark: "#E34C26" },
    { name: "Canva", Icon: SiCanvas, colorLight: "#00C4CC", colorDark: "#00C4CC" }
  ];

export default function Home({ isDark }) {

const [showLoader, setShowLoader] = useState(() => {
  return !sessionStorage.getItem("hasSeenIntro");
});
  
const { data: projects, isLoading, error } = useFetch(`${API_URL}/api/projects/featured`);

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
              <div className="group border border-boder bg-muted/40 backdrop-blur-sm rounded-2xl 
              p-3 mb-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                
                <div className="aspect-4/4 overflow-hidden rounded-xl">
                  {project.images?.length > 0  && (
                    <img
                      src={project.images[project.images.length - 1]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform 
                      duration-300"
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
                <p className="text-sm mt-1 line-clamp-2">{project.description}</p>
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
      <section className="relative overflow-hidden space-y-10 p-4 ">

        {/* Glass card - actual content */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl 
        p-8 lg:p-12">
  
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* LEFT: Text content */}
            <div className="flex-1 text-left order-2 lg:order-1">
              
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 
              bg-white/5 px-4 py-1.5 text-xs mb-6 hover:border-primary/50 hover:bg-primary/10 
              transition-colors duration-300 tracking-widest">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-muted-foreground uppercase tracking-wide "
                >
                  Available for work
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider uppercase 
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

              <p className="text-sm mb-6 max-w-xl tracking-wider">
               I'm a full-stack developer specializing in the MERN stack, building performant web applications 
               with React, Node.js, Express, and MongoDB. From RESTful API design to responsive, component-driven
               UIs, I focus on writing clean, scalable code — with hands-on experience in authentication, cloud media 
               handling, and real-world deployment workflows.
              </p>

              <Link to="/projects">
                <Button
                  size="md"
                  className="rounded-md px-3 py-1.5 bg-muted/40 border border-border backdrop-blur-md 
                  text-foreground hover:border-primary/50 hover:bg-primary/10 cursor-pointer 
                  transition-colors duration-300"
                >
                  <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                    view my work
                  </span>
                </Button>
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
      <section className= "p-4 space-y-10">
         {content}

        {/* tech icon grid */}
         <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl 
         p-8 lg:p-12 block">
              <h2 className="text-2xl sm:text-xl font-bold uppercase tracking-widest text-center mb-6"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Tech-Stack
              </h2>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                {skills.map(({ name, Icon, colorLight, colorDark }) => {
                  const color = isDark ? colorDark : colorLight;
                  return (
                    <Icon
                      key={name}
                      size={40}
                      color={color}
                      style={{ '--glow': color }}
                      className="hover:drop-shadow-[0_0_8px_var(--glow)] transition-all duration-300"
                    />
                  );
                })}
              </div>
         </div>

        <Link to="/contact" className="block">
            <Button
              size="md"
              className="rounded-md px-3 py-1.5 bg-muted/40 border border-border backdrop-blur-md 
              text-foreground hover:border-primary/50 hover:bg-primary/10 cursor-pointer 
              transition-colors duration-300"
            >
              <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                connect with me
              </span>
            </Button>
          </Link>
      </section>
    </>

    );
}

