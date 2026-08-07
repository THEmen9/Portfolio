import React from 'react'

export default function About({bio}) {
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <h2 >About</h2>
        <p>{bio}</p>
    </section>
  )
}

