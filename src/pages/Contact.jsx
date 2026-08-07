import React,{useState} from 'react'
  // import { useForm, SubmitHandler } from "react-hook-form"

export default function Contact({email}) {
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
}
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log('Form submitted:', formData);
  }

  return (
   <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <h2>Contact</h2>
        <p>Email me at : {email} </p>
        <form onSubmit={handleSubmit} className ='space-y-4 mt-4'>
          <input
          type= 'text'
          name='name'
          placeholder='Your Name'
          value={formData.name}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <input
          type= 'email'
          name='email'
          placeholder='Your Email'
          value={formData.email}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
          <textarea
          name='message'
          placeholder='Your Message'
          value={formData.message}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
          <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
        </form>
   </section>
  )
}

