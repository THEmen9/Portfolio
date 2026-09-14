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

  const inputClass = "w-full p-2.5 rounded-lg bg-muted/40 border border-border backdrop-blur-md placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300";


 function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email";
    }
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
        const data = await response.json();
        throw new Error(data.error || `Server error: ${response.status}`);
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
    <> 
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
            contact me
        </h1>
       <div className="bg-muted/40 backdrop-blur-md border border-border rounded-2xl p-8 lg:p-12 
       text-foreground">    
        <p className="text-muted-foreground mt-2">Email me at : {email} </p>
      <form onSubmit={handleSubmit} className ='space-y-4 mt-4'>
        <div>
          <input
            type= 'text'
            name='name'
            placeholder='Your Name'
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            />
            {error.name && <p className="text-destructive text-sm mt-1">{error.name}</p>}
        </div>
        <div>
          <input
            type= 'email'
            name='email'
            placeholder='Your Email'
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            />
            {error.email && <p className="text-destructive text-sm mt-1">{error.email}</p>}
        </div>
        <div>
          <textarea
            name='message'
            placeholder='Your Message'
            value={formData.message}
            onChange={handleChange}
            className={inputClass}
            />
            {error.message && <p className="text-destructive text-sm mt-1">{error.message}</p>}
        </div>
           
            {submitError && <p className="text-destructive text-sm">{submitError}</p>}
            {submitSuccess && <p className="text-green-500 text-sm">Message sent successfully!</p>}
        
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
   </>
  )
}