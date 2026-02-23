import React from 'react'

export default function HomePage() {
  return (
    <section className="py-12">
      <div className="space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold">Hi, I'm Augusten — Automation Engineer & Full Stack Developer</h2>
        <p className="text-lg max-w-3xl opacity-90">Tired of manual work or low-quality web developers? I help businesses automate and ship reliable web apps. Email: augustenrabi6383@gmail.com</p>

        <div className="mt-8 flex gap-4">
          <a href="/resume.pdf" className="px-4 py-2 bg-primary text-black rounded-md">Resume (placeholder)</a>
          <a href="/projects" className="px-4 py-2 border border-white/20 rounded-md">View Projects</a>
        </div>
      </div>

      <section className="mt-16">
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded">
            <h4 className="font-semibold">Automation Engineer</h4>
            <ul className="mt-2 text-sm opacity-90">
              <li>Test automation (Selenium / Playwright)</li>
              <li>CI/CD pipelines (GitHub Actions, GitLab CI)</li>
              <li>Infrastructure as code (Terraform)</li>
            </ul>
          </div>

          <div className="p-4 bg-white/5 rounded">
            <h4 className="font-semibold">Full Stack Web Developer</h4>
            <ul className="mt-2 text-sm opacity-90">
              <li>Next.js (App Router), React, TypeScript</li>
              <li>Node.js, REST/GraphQL APIs</li>
              <li>Supabase/Postgres, Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  )
}
