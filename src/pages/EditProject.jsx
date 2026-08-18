import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import useFetch from '../hooks/useFetch'
import Button from "../components/Button";


export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: fetchedProject, isLoading, error } = useFetch(
    `http://localhost:5000/api/projects/${id}`,
     isEditMode
    );
  const [formData, setFormData] = useState({
        title: "",
        description: "",
        images: "",
        techStack: "",
        githubLink: "",
        liveDemo: ""
    });  
  const [submitStatus, setSubmitStatus] = useState("idle");
  

  const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
   e.preventDefault();
   const newErrors = validate();
   

  setSubmitStatus("submitting");

  try {
    const response = await fetch(
      isEditMode
      ? `http://localhost:5000/api/projects/${id}`
      : "http://localhost:5000/api/projects",
      {
        method: isEditMode ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: formData.images
            .split(",")
            .map(item => item.trim())
            .filter(Boolean),

          techStack: formData.techStack
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
            credentials: "include",
            
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
    setFormData({
      title: fetchedProject.title,
      description: fetchedProject.description,
      images: fetchedProject.images.join(", ") || "",
      techStack: fetchedProject.techStack.join(", ") || "",
      githubLink: fetchedProject.githubLink,
      liveDemo: fetchedProject.liveDemo,
    });
  }
}, [fetchedProject]);

if (isEditMode && isLoading) {
  return <p>Loading...</p>;
}

if (isEditMode && error) {
  return <p className="text-red-500">{error}</p>;
}

  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <form className ='space-y-4 mt-4'onSubmit={handleSubmit} >
          <div> 
            <label htmlFor="title" className="block mb-1 font-medium">
              Project Title
            </label >
            <input
              type= 'text'
              id="title"
              name='title'
              placeholder="title"
              value={formData.title}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label >
            <textarea
              name="description"
              id="description"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
           <label htmlFor="images" className="block mb-1 font-medium">
              Images
            </label >
            <input
              type= 'text'
              id="images"
              name='images'
              placeholder="images URL"
              value={formData.images}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label htmlFor="techStack" className="block mb-1 font-medium">
              Tech-Stack
            </label >
            <input
              type= 'text'
              id="techStack"
              name='techStack'
              placeholder="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label htmlFor="githubLink" className="block mb-1 font-medium">
              Github-Link
            </label >
            <input
              type= 'text'
              id="githubLink"
              name='githubLink'
              placeholder="githubLink" 
              value={formData.githubLink}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label htmlFor="liveDemo" className="block mb-1 font-medium">
              liveDemo
            </label >
            <input
              type= 'text'
              id="liveDemo  "
              name='liveDemo'
              placeholder="liveDemo URL" 
              value={formData.liveDemo}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          </div>
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

            {isEditMode && (
            <Button 
            type="button"
            size="sm" 
            className="bg-red-500" 
            onClick={handleDelete}
            disabled={isDeleting}
            >
            {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        )}
        </form>
    </section>
  )
}