import React,{useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { GooeyInput } from "../components/ui/gooey-input";
import Button from "../components/Button";
import { API_URL } from "../config/api";

 export default function Projects() {
    const[allProjects, setAllProjects] = useState([]); 
    const [totalCount, setTotalCount] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);
   
  const fetchProjects = async (skipValue) => {
    setLoadingMore(true);
    setError(null); 
    try {
      const response = await fetch(`${API_URL}/api/projects?limit=6&skip=${skipValue}`);
      const result = await response.json();

      setTotalCount(result.totalCount);
      setAllProjects(prev => [...prev, ...result.projects]);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };
//----------------------------------------------------------------//
    useEffect(() => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      fetchProjects(0);
    }, []);

//----------------------------------------------------------------//
   const handleLoadMore = () => {
    fetchProjects(allProjects.length);
  };
//----------------------------------------------------------------//
   let content;
    if(loadingMore && allProjects.length === 0) {
      content = <p>Loading Projects...</p>;
    } else if (error) {
      content = <p className='text-red-500'>{error}</p>
    } else {
      const filteredProjects = allProjects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
      const techMatch = project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return titleMatch || techMatch;
    });
      content = (
        <>
         {filteredProjects.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">
            No projects match your search.
          </p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project._id} to={`/projects/${project._id}`}>
               <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border">
    
                {project.images?.length > 0 && (
                  <img
                    src={project.images[project.images.length - 1]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Overlay - reveals on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  
                  <h3 className="text-lg uppercase tracking-wider font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/80 mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack?.map((tech) => (
                      <span 
                        key={tech} 
                        className="inline-flex items-center rounded-full border border-white/30 
                        bg-white/10 px-2.5 py-0.5 text-xs text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
        </>
     )
   }
  return (
    <section className= "relative overflow-hidden space-y-10 p-4">
       <h1 className="text-3xl uppercase tracking-widest font-bold text-center mb-8"
          style={{
              backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
        >
          Projects
        </h1>
       <GooeyInput
        placeholder="Search by title or tech..."
        value={searchTerm}
        onValueChange={setSearchTerm}
        collapsedWidth={120}
        expandedWidth={320}
      />
        {content}

      {allProjects.length < totalCount && !searchTerm && (

      <div className="flex justify-center">
        <Button 
          onClick={handleLoadMore} 
          disabled={loadingMore}
          size="md" 
          className="rounded-md px-3 py-1.5 bg-muted/40 border border-border 
          backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
          >
          {loadingMore ? "Loading..." : "Load More"}
        </Button>
      </div>

    )}
    </section>
  );
}

 