import { useEffect, useState } from "react";
import { LuServer, LuCode, LuTerminal, LuRocket, LuUnplug } from "react-icons/lu";

const loaderIcons = [LuServer, LuCode, LuTerminal, LuRocket, LuUnplug];


function IntroLoader() {
  const [isFading, setIsFading] = useState(false);
  const [iconIndexes, setIconIndexes] = useState([0, 1, 2]);


  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 5000);
    return () => clearTimeout(fadeTimer);
  }, []);

   useEffect(() => {
    const iconInterval = setInterval(() => {
      setIconIndexes([
        Math.floor(Math.random() * loaderIcons.length),
        Math.floor(Math.random() * loaderIcons.length),
        Math.floor(Math.random() * loaderIcons.length),
      ]);
    }, 400);
    return () => clearInterval(iconInterval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background
        transition-opacity duration-500 px-4 ${isFading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 animate-fade-in-scale 
      text-center">
        <h1 
            className="text-xl sm:text-3xl md:text-5xl font-bold font-mono tracking-wide sm:tracking-widest 
            text-transparent"
            style={{
                backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
            }}
        >
        <span className="animate-pulse">&gt;</span>  initializing_portfolio
        </h1>
        <span className="flex gap-1 pb-1 sm:pb-3">
          {iconIndexes.map((iconIdx, i) => {
            const Icon = loaderIcons[iconIdx];
            return (
              <Icon
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 text-primary animate-bounce ${
                  i === 0 ? "[animation-delay:-0.3s]" : i === 1 ? "[animation-delay:-0.15s]" : ""
                }`}
              />
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default IntroLoader;