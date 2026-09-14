import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
      <footer className="mt-12 border-t border-border bg-background px-4">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND / INTRO*/}
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest">
              Mr. Ankit
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground tracking-widest">
              Full-stack developer focused on building clean,
              scalable, and user-friendly web experiences.
            </p>

            {/* Availability indicator */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full
              border border-border px-3 py-1.5 text-xs
              text-muted-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className='tracking-widest'>
                Available for work
              </span>
            </div>
          </div>


          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest">
              Explore
            </h3>

            <nav className="mt-4 flex flex-col items-start gap-2 text-sm">

              <Link
                to="/"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                About
              </Link>

              <Link
                to="/projects"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                Projects
              </Link>

              <Link
                to="/contact"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                Contact
              </Link>

            </nav>
          </div>


          {/* CONNECT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest">
              Connect
            </h3>

            <div className="mt-4 flex flex-col items-start gap-2 text-sm">

              <a
                href="https://github.com/THEmen9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/mr-ankit-dev404/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                LinkedIn
              </a>

              <a
                href="mailto:ankitsmi.7557@gmail.com"
                className="text-muted-foreground transition-colors duration-300
                hover:text-primary tracking-widest"
              >
                Email
              </a>

            </div>
          </div>

        </div>
      </div>


      {/* FOOTER BOTTOM BAR */}
      <div className="border-t border-border">

        <div className="max-w-7xl mx-auto py-4 flex flex-col sm:flex-row
          items-center justify-between gap-3 text-xs text-muted-foreground"
        >

          <p className='tracking-widest'>
            © 2026 Ankit. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <span className='tracking-widest'>
              Built with MERN
            </span>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                })
              }
              className="transition-colors duration-300
              hover:text-primary cursor-pointer tracking-widest"
            >
              Back to top ↑
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
}