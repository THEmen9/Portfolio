import React,{useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { GooeyInput } from "../components/ui/gooey-input";
import Button from "../components/Button";

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
      const response = await fetch(`http://localhost:5000/api/projects?limit=6&skip=${skipValue}`);
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
          {filteredProjects.map((project) => (
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
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
       <h2 >Projects</h2>
       <GooeyInput
        placeholder="Search by title or tech..."
        value={searchTerm}
        onValueChange={setSearchTerm}
        collapsedWidth={120}
        expandedWidth={320}
      />
        {content}
        {allProjects.length < totalCount && (
      <Button onClick={handleLoadMore} disabled={loadingMore}>
        {loadingMore ? "Loading..." : "Load More"}
      </Button>
    )}
    </section>
  );
}

 