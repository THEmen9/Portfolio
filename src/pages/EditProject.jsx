import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import useFetch from '../hooks/useFetch'
import Button from "../components/Button";


export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const { data: fetchedProject, isLoading, error } = useFetch(`http://localhost:5000/api/projects/${id}`);
  const [project, setProject] = useState({
        title: "",
        description: "",
        images: "",
        techStack: "",
        githubLink: "",
        liveDemo: ""
    });  
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => {
    setProject(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  setSubmitStatus("submitting");

  try {
    const response = await fetch(
      `http://localhost:5000/api/projects/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...project,
          images: project.images
            .split(",")
            .map(item => item.trim())
            .filter(Boolean),

          techStack: project.techStack
            .split(",")
            .map(item => item.trim())
            .filter(Boolean),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    setSubmitStatus("success");
    navigate("/admin");
  } catch (err) {
    console.error(err);
    setSubmitStatus("error");
  }
};

const handleDelete = async () => {
    try {
        if (!window.confirm("Are you sure you want to delete this project?")) {
        return;
        }
        setIsDeleting(true);
        const response = await fetch(`http://localhost:5000/api/projects/${id}`,{
            method: "DELETE",
        });
        if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
        }
        console.log("Project deleted successfully");
        navigate("/admin");

    } catch (err) {
        console.error(err);
    } finally {
     setIsDeleting(false);
  }
};
  
  useEffect(() => {
  if (fetchedProject) {
    setProject({
      title: fetchedProject.title,
      description: fetchedProject.description,
      images: fetchedProject.images.join(", "),
      techStack: fetchedProject.techStack.join(", "),
      githubLink: fetchedProject.githubLink,
      liveDemo: fetchedProject.liveDemo,
    });
  }
}, [fetchedProject]);

if (isLoading) return <p>Loading...</p>;
if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <form className ='space-y-4 mt-4'onSubmit={handleSubmit} >
            <input
            type= 'text'
            name='title'
            value={project.title}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
            <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            />
          <input
            type= 'text'
            name='images'
            value={project.images}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          <input
            type= 'text'
            name='techStack'
            value={project.techStack}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          <input
            type= 'text'
            name='githubLink'
            value={project.githubLink}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          <input
            type= 'text'
            name='liveDemo'
            value={project.liveDemo}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          <Button
            type = "submit"
            size="sm"
            className="bg-blue-500"
            disabled={submitStatus === "submitting"}
            >
            {submitStatus === "submitting" ? "Saving..." : "Save"}
            </Button>
            {submitStatus === "success" && <p className="text-green-500">Saved successfully!</p>}
            {submitStatus === "error" && <p className="text-red-500">Failed to save.</p>}
            <Button 
            type="button"
            size="sm" 
            className="bg-red-500" 
            onClick={handleDelete}
            disabled={isDeleting}
            >
            Delete
        </Button>
        </form>
    </section>
  )
}