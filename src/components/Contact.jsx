import React,{useState} from 'react'
  // import { useForm, SubmitHandler } from "react-hook-form"

export default function Contact({email}) {
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

          <input
          type= 'email'
          name='email'
          placeholder='Your Email'
          value={formData.email}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />

          <textarea
          name='message'
          placeholder='Your Message'
          value={formData.message}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />

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

