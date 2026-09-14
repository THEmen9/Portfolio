//------------imports----------//
import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import useFetch from '../hooks/useFetch'
import Button from "../components/Button";


export default function ProjectForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({});

  const inputClass = "w-full p-2.5 rounded-lg bg-muted/40 border border-border backdrop-blur-md placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300";


  const { data: fetchedProject, isLoading, error } = useFetch(
    `http://localhost:5000/api/projects/${id}`,
     isEditMode
    );
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveDemo: ""
    });  
//--------------validation---------------//
  function validate() {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "title is required";
    if (!formData.description.trim()) newErrors.description = "description is required";
    if (!isEditMode && imageFiles.length === 0) newErrors.images = "At least one image is required";
    if (!formData.techStack.trim()) newErrors.techStack = "techStack is required";
    return newErrors;
};

//----------file handler-------//

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setImageFiles(filesArray)
  };

//----------------------------------------------------------------------------//

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles(prev => prev.filter((file, index) => index !== indexToRemove));
  }
//---------------------------------------------------------------------------//

  const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
  }

//-----------submit-------------//
  const handleSubmit = async (e) => {
   e.preventDefault();
   const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitStatus("submitting");

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("githubLink", formData.githubLink);
    payload.append("liveDemo", formData.liveDemo);

    formData.techStack.split(",").map(t => t.trim()).filter(Boolean)
      .forEach(tech => payload.append("techStack", tech));

    imageFiles.forEach(file => payload.append("images", file));

  try {
    const response = await fetch(
      isEditMode
      ? `http://localhost:5000/api/projects/${id}`
      : "http://localhost:5000/api/projects",
      {
        method: isEditMode ? "PUT" : "POST",
        credentials: "include",
        body: payload
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
//-------------------Delete---------------------//
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
//---------------------------------------------------------------------//
  useEffect(() => {
  if (fetchedProject) {
    setFormData({
      title: fetchedProject.title || "",
      description: fetchedProject.description || "",
      techStack: fetchedProject.techStack.join(", ") || "",
      githubLink: fetchedProject.githubLink || "",
      liveDemo: fetchedProject.liveDemo || "",
    });
  }
}, [fetchedProject]);

if (isEditMode && isLoading) {
  return <p>Loading...</p>;
}
if (isEditMode && error) {
  return <p className="text-destructive text-sm">{error}</p>;
}

  return (
    <section className="relative overflow-hidden p-4">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="bg-muted/40 backdrop-blur-md border border-border rounded-2xl p-8 lg:p-12 
       text-foreground">
        <form className ='space-y-4 mt-4'onSubmit={handleSubmit} >
        {/* //-------------------------------Div-1--------------------------------// */}
          <div> 
            <label htmlFor="title" className="block mb-1 tracking-widest font-medium">
              Project Title
            </label >
            <input
              type= 'text'
              id="title"
              name='title'
              placeholder="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.title && (
                <p className="text-destructive text-sm mt-1">{errors.title}</p>
            )}
          </div>
        {/* //----------------------------------Div-2---------------------------------// */}
          <div>
            <label htmlFor="description" className="block mb-1 font-medium tracking-widest">
              Description
            </label >
            <textarea
              name="description"
              id="description"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.description && (
                <p className="text-destructive text-sm mt-1">{errors.description}</p>
            )}
          </div>
         {/* //----------------------------------Div-3---------------------------------// */}
          <div>
           <label htmlFor="images" className="block mb-1 tracking-widest font-medium">
              Images
            </label >
            <input
              type= 'file'
              id="images"
              multiple 
              name='images'
              onChange={handleFileChange}
              className={inputClass}
            />
            {errors.images && (
                <p className="text-destructive text-sm mt-1">{errors.images}</p>
            )}
          {/* --------preview section-------------------*/}
            <div className="flex flex-wrap gap-2 mt-2">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white 
                    rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
         {/* //----------------------------------Div-4---------------------------------// */}
          <div>
            <label htmlFor="techStack" className="block mb-1 tracking-widest font-medium">
              Tech-Stack
            </label >
            <input
              type= 'text'
              id="techStack"
              name='techStack'
              placeholder="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.techStack && (
                <p className="text-destructive text-sm mt-1">{errors.techStack}</p>
            )}
          </div>
         {/* //----------------------------------Div-4---------------------------------// */}
          <div>
            <label htmlFor="githubLink" className="block mb-1 tracking-widest font-medium">
              Github-Link(Optional)
            </label >
            <input
              type= 'text'
              id="githubLink"
              name='githubLink'
              placeholder="githubLink" 
              value={formData.githubLink}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
         {/* //----------------------------------Div-5---------------------------------// */}
          <div>
            <label htmlFor="liveDemo" className="block mb-1 tracking-widest font-medium">
              liveDemo(Optional)
            </label >
            <input
              type= 'text'
              id="liveDemo"
              name='liveDemo'
              placeholder="liveDemo URL" 
              value={formData.liveDemo}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          {/* //----------------------------------Button-1------------------------------// */}
          <div className="flex justify-between mt-6">
          <Button
            type = "submit"
            size="sm"
            className="rounded-md px-4 py-2 text-xs uppercase tracking-widest bg-muted/40 border 
            border-border backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors 
            duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

            disabled={submitStatus === "submitting"}
            >
            {submitStatus === "submitting" ? "Saving..." : "Save"}
            </Button>

          {/* //--------------------------Success/failed-message-----------------------// */}
            {submitStatus === "success" && <p className="text-green-500">Saved successfully!</p>}
            {submitStatus === "error" && <p className="text-destructive text-sm">Failed to save.</p>}

          {/* //----------------------------------Button-2-----------------------------// */}
            {isEditMode && (
            <Button 
            type="button"
            size="sm" 
            className="rounded-md px-4 py-2 text-xs uppercase tracking-widest bg-muted/40 border 
            border-border backdrop-blur-md hover:border-destructive/50 hover:bg-destructive/20 transition-colors 
            duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleDelete}
            disabled={isDeleting}
            >
            {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        )}
        </div>
        </form>
        </div>
      </div>
    </section>
  )
}