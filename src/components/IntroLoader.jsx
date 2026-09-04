import { useEffect, useState } from "react";

function IntroLoader() {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 5000);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background
        transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-end gap-2 animate-fade-in-scale">
        <h1 
            className="text-5xl font-bold text-transparent"
            style={{
                backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
            }}
        >
            Hello World !
        </h1>
        <span className="flex gap-1 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </span>
      </div>
    </div>
  );
}

export default IntroLoader;