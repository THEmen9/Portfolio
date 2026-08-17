import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Button from "../components/Button"

export default function AdminDashboard(){
    const navigate = useNavigate();
    const { data: projects, isLoading, error } = useFetch("http://localhost:5000/api/projects");
    

    let content;
    if(isLoading) {
      content = <p>Loading Projects...</p>;
    } else if (error) {
      content = <p className='text-red-500'>{error}</p>
    } else {
      content = (
        <>
          {projects.map((project) => (
            <div key={project._id} className='mb-4 border bg-gray-100 dark:bg-gray-800 p-2'>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Button 
                 size="sm"
                 className="bg-blue-500" 
                 onClick={() => navigate(`/admin/edit/${project._id}`)}
                 >
                 Edit
                </Button>
                <Button size="sm" 
                 className="bg-red-500" 
                 onClick={() => console.log("delete", project._id)}
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
       <h2 >Projects</h2>
       {content}
    </section>
  );
}