import useFetch from '../hooks/useFetch'
import Button from '../components/Button'

export default function About() {
  const { data: about, isLoading, error } = useFetch("http://localhost:5000/api/about");

  let content;

  if (isLoading) {
    content = <p>Loading content...</p>;
  } else if (error) {
    content = <p className='text-red-500'>{error}</p>;
  } else {
    content = (<>
      <div className="space-y-8">
        {/* Intro */}
        <div className="space-y-4">
          {about.intro.map((para, i) => (
          <p 
            key={i}
            className={i === 0 ? "text-xl font-medium text-foreground" : "text-muted-foreground"}
          >
            {para}
          </p>
          ))}
        </div>

        {/* sections */}
        {about.sections.map((section, i) => (
        <div key={i} className="bg-muted/20 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>

          {section.type === "paragraphs" && section.paragraphs.map((para, j) => (
             <p 
              key={j} 
              className={j === 0 ? "text-lg font-medium text-primary mb-4" : "mb-4"}
            >
              {para}
            </p>
          ))}

          {section.type === "categories" && section.categories.map((cat, j) => (
            <div key={j} className="mb-6">
              <h3 className="text-lg font-medium mb-2 border-l-2 border-primary pl-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="inline-flex items-center rounded-full border border-border 
                  bg-muted/40 px-3 py-1 text-xs hover:border-primary/50 hover:bg-primary/10 transition-colors 
                  duration-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))} 
      </div> 
    </>
    )
  }
  return (
    <section className="relative overflow-hidden p-4 ">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest"
          style={{
              backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
        >
            About me
        </h1>

        <div className="bg-muted/40 backdrop-blur-md border border-border rounded-2xl p-8 leading-relaxed">
          {content}
        </div>
        <div className="flex justify-center">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="rounded-full px-3 py-1.5 bg-muted/40 border border-border backdrop-blur-md 
              hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300"
              >
                Download Resume
              </Button>
            </a>
        </div>
      </div>
    </section>
  )
}

