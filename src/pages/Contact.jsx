import React,{useState, useEffect} from 'react'

export default function Contact({email}) {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

 function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    setIsSubmitting(true);
    setSubmitSuccess(false); 
    setSubmitError(null);

    try {
      const response =  await fetch("http://localhost:5000/api/contact", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
       setSubmitSuccess(true);

// reseting form ---------------------//
      setFormData({
          name: '',
          email: '',
          message: ''
      });

    } catch (err) {
      setSubmitError(err.message);
    }finally{
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 3000); // hide after 3 second
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

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
          {error.name && (
            <p className="text-red-500 text-sm mt-1">{error.name}</p>
          )}
          <input
          type= 'email'
          name='email'
          placeholder='Your Email'
          value={formData.email}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
          <textarea
          name='message'
          placeholder='Your Message'
          value={formData.message}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          />
          {error.message && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
          {submitError && <p className="text-red-500">{submitError}</p>}
          {submitSuccess && <p className="text-green-500">Message sent successfully!</p>}
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