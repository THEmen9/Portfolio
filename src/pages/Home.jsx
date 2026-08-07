import { Link } from 'react-router-dom';

function Home({isDark}) {
  return (
    <section className="text-center py-16 bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <h1 className="text-3xl font-bold">Hi, I'm Ankit</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Full-Stack Developer building MERN apps
      </p>
      <Link
        to="/projects"
        className="mt-6 inline-block px-5 py-2 bg-blue-600 text-white rounded"
      >
        View My Work
      </Link>
    </section>
  );
}

export default Home;