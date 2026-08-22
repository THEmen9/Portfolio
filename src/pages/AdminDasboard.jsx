import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Button from "../components/Button"
import { useState, useEffect } from "react";

export default function AdminDashboard(){
    const [isDeleting, setIsDeleting] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    const { data: projects, isLoading, error } = useFetch("http://localhost:5000/api/projects");
    
    const handleToggleFeatured = async (projectId, currentValue) => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}/featured`, {
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
          const response = await fetch(`http://localhost:5000/api/projects/${projectId}`,{
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
      setProjectList(projects);
    }
  }, [projects]);

    let content;
    if(isLoading) {
      content = <p>Loading Projects...</p>;
    } else if (error) {
      content = <p className='text-red-500'>{error}</p>
    } else {
      content = (
        <>
          {projectList.map((project) => (
            <div key={project._id} className='mb-4 border bg-gray-100 dark:bg-gray-800 p-2'>
                <label htmlFor={`featured-${project._id}`} className="block mb-1 font-medium">
                 Featured
                </label >
                <input
                  id={`featured-${project._id}`}
                  type="checkbox"
                  checked={project.featured || false}
                  onChange={() => handleToggleFeatured(project._id, project.featured)}
                />
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
                
                <Button 
                 size="sm"
                 className="bg-blue-500" 
                 onClick={() => navigate(`/admin/edit/${project._id}`)}
                 >
                 Edit
                </Button>
                <Button size="sm" 
                 className="bg-red-500" 
                 onClick={() => handleDelete(project._id)}
                 >
                 Delete
                </Button>
            </div>
        ))}
        </>
     )
   }
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
       <div className="flex justify-between items-center mb-4">
        <h2>Projects</h2>

        <Button
          size="sm"
          className="bg-green-500"
          onClick={() => navigate("/admin/add")}
        >
          Add Project
        </Button>
       </div>
       {content}
    </section>
  );
}