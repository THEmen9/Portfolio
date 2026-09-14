import { useEffect, useState } from "react";
import { LuServer, LuCode, LuTerminal, LuRocket, LuUnplug } from "react-icons/lu";

const loaderIcons = [LuServer, LuCode, LuTerminal, LuRocket, LuUnplug];


function IntroLoader() {
  const [isFading, setIsFading] = useState(false);
  const [iconIndexes, setIconIndexes] = useState([0, 1, 2]);


  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 500000);
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
        transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-end gap-2 animate-fade-in-scale">
        <h1 
            className="text-5xl font-bold font-mono tracking-widest text-transparent"
            style={{
                backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
            }}
        >
        <span className="animate-pluse">&gt;</span>  initializing_portfolio
        </h1>
        <span className="flex gap-1 pb-3">
          {iconIndexes.map((iconIdx, i) => {
            const Icon = loaderIcons[iconIdx];
            return (
              <Icon
                key={i}
                className={`w-5 h-5 text-primary animate-bounce ${
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