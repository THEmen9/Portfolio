import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../config/api";

export default function Login({setIsAuth}) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const inputClass = "w-full p-2.5 rounded-lg bg-muted/40 border border-border backdrop-blur-md placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300";


  function validate() {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
};

  const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name] : e.target.value,
    })
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response =  await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Server error: ${response.status}`);
      }
       setIsAuth(true);

// reseting form ---------------------//
      setFormData({
          email: '',
          password: ''
      });

     navigate("/admin");

    } catch (err) {
      setSubmitError(err.message);
    }finally{
      setIsSubmitting(false);
    }
};

  return (
   <section className="relative overflow-hidden p-4">
    <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest"
          style={{
              backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
        >
            Login
        </h1>
        <div className="bg-muted/40 backdrop-blur-md border border-border rounded-2xl p-8 lg:p-12 
         text-foreground">  
        <form onSubmit={handleSubmit} className ='space-y-4 mt-4'>
          <div>
            <input
            type= 'email'
            name='email'
            placeholder='username'
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
            type= 'password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
            />
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
          </div>
            {submitError && <p className="text-destructive text-sm">{submitError}</p>}

          <button
            disabled={isSubmitting}
            type='submit' 
            className="rounded-full px-4 py-2 text-xs uppercase tracking-widest bg-muted/40 border 
            border-border backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 transition-colors 
            duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
        </div>
      </div>
   </section>
  )
}