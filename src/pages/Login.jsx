import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({setIsAuth}) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
      const response =  await fetch("http://localhost:5000/api/admin/login", {
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
   <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className ='space-y-4 mt-4'>
            <input
            type= 'email'
            name='email'
            placeholder='username'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            <input
            type= 'password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            />

            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {submitError && <p className="text-red-500">{submitError}</p>}

            <button
            disabled={isSubmitting}
            type='submit' 
            className="bg-blue-600 text-white px-4 py-2 rounded">
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
   </section>
  )
}