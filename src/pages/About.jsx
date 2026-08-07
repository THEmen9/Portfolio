import React from 'react'
import  {aboutContent}  from '../data/content';

export default function About({isDark}) {
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
        <p>{aboutContent.bio}</p>
    </section>
  )
}

