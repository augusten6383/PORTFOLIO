import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Augusten Rabi MP — Portfolio',
  description: 'Futuristic portfolio — Automation Engineer & Full Stack Web Developer'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#071024] via-[#08122a] to-[#05060b] font-poppins text-white">
        <div className="max-w-5xl mx-auto px-6">
          <header className="py-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Augusten Rabi MP</h1>
              <nav>
                <a href="/" className="mr-4 text-sm hover:underline">Home</a>
                <a href="/projects" className="mr-4 text-sm hover:underline">Projects</a>
                <a href="/admin" className="text-sm hover:underline">Admin</a>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="mt-20 py-8 text-sm opacity-80">
            <div className="flex justify-between">
              <div>© {new Date().getFullYear()} Augusten Rabi MP</div>
              <div>Built with Next.js + Supabase • Futuristic UI</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
