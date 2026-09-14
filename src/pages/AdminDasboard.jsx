import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Button from "../components/Button"
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

export default function AdminDashboard(){
    const [isDeleting, setIsDeleting] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    const { data: projects, isLoading, error } = useFetch(
      `${API_URL}/api/projects?limit=1000`
    );
    
    const handleToggleFeatured = async (projectId, currentValue) => {
      try {
        const response = await fetch(`${API_URL}/api/projects/${projectId}/featured`,{
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ featured: !currentValue }),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

       const updatedProject = await response.json();
       setProjectList(prev => prev.map(p => p._id === projectId ? updatedProject : p));

      } catch (err) {
        console.error(err);
      }
    };

    const handleDelete = async (projectId) => {
      try {
          if (!window.confirm("Are you sure you want to delete this project?")) {
          return;
          }
          setIsDeleting(true);
          const response = await fetch(`${API_URL}/api/projects/${projectId}`,{
              method: "DELETE",
              credentials: "include",
              
          });
          if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
          }
          console.log("Project deleted successfully");
          setProjectList(prev =>
            prev.filter(project => project._id !== projectId)
          );

          } catch (err) {
              console.error(err);
          } finally {
          setIsDeleting(false);
        }
    };

  useEffect(() => {
    if (projects) {
      setProjectList(projects.projects);
    }
  }, [projects]);

    let content;
    if(isLoading) {
      content = <p>Loading Projects...</p>;
    } else if (error) {
      content = <p className='text-destructive text-sm'>{error}</p>
    } else {
      content = (
        <>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projectList.map((project) => (
            <div key={project._id}>

              {/* FEATURED CONTROL */}
              <div className="flex justify-center mb-3">
                <label
                  htmlFor={`featured-${project._id}`}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent 
                  px-3 py-1.5 cursor-pointer hover:border-primary/50 hover:bg-primary/10 transition-colors 
                  duration-300"
                >
                  <input
                    id={`featured-${project._id}`}
                    type="checkbox"
                    checked={project.featured || false}
                    onChange={() =>
                      handleToggleFeatured(project._id, project.featured)
                    }
                    className="cursor-pointer"
                  />

                  <span className="text-sm tracking-widest">
                    Featured
                  </span>
                </label>
              </div>


              {/* PROJECT PREVIEW CARD*/}
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border">

                {/* Project preview image */}
                {project.images?.length > 0 && (
                  <img
                    src={project.images[project.images.length - 1]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                    group-hover:scale-105"
                  />
                )}


                {/* HOVER OVERLAY */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col 
                  justify-end p-4"
                >

                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-1">
                    {project.description}
                  </p>

                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-border bg-muted/40 
                        px-3 py-1 text-xs hover:border-primary/50 hover:bg-primary/10 transition-colors 
                        duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>


              {/* CARD ACTIONS*/}
              <div className="flex items-center justify-between mt-3">

                {/* Edit button - outside card, left side */}
                <Button
                  size="sm"
                  className="rounded-md px-3 py-1.5 text-xs uppercase tracking-widest bg-transparent border border-border hover:border-primary/50 
                  hover:bg-primary/10 transition-colors duration-300"
                  onClick={() =>
                    navigate(`/admin/edit/${project._id}`)
                  }
                >
                  Edit
                </Button>


                {/* Delete button - outside card, right side */}
                <Button
                  size="sm"
                  className="rounded-md px-3 py-1.5 text-xs uppercase tracking-widest bg-transparent border border-border hover:border-destructive/50 
                  hover:bg-destructive/10 transition-colors duration-300"
                  onClick={() =>
                    handleDelete(project._id)
                  }
                >
                  Delete
                </Button>

              </div>

            </div>
          ))}
        </div>
      </>
     )
   }
  return (
    <section className="relative overflow-hidden space-y-10 p-4">
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

        <Button
          size="sm"
          className="rounded-md px-3 py-1.5 text-xs uppercase tracking-widest bg-muted/40 border border-border 
          backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
          onClick={() => navigate("/admin/add")}
        >
          Add Project
        </Button>
     
       {content}
    </section>
  );
}