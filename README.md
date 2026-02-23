# Augusten's Dynamic Portfolio

A modern, dynamic personal portfolio website built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase. This portfolio showcases projects, skills, certifications, and experience with a clean admin interface for content management.

## Features

- **Next.js App Router + TypeScript**: Modern React framework with type safety
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Supabase Integration**: Serverless backend with authentication, database, and file storage
- **Admin Dashboard**: Secure admin area for managing portfolio content
- **Dynamic Content**: Projects, skills, certifications, and experience sections
- **File Uploads**: Support for project images and certificate PDFs via Supabase Storage
- **Responsive Design**: Mobile-first approach with modern UI components
- **Framer Motion & GSAP**: Animation libraries ready for implementation

## Tech Stack

- **Frontend**: Next.js 13+, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Database**: PostgreSQL via Supabase
- **Animations**: Framer Motion, GSAP (available for use)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Local Development

1. **Clone and install dependencies**

```bash
cd /path/to/portfolio
npm install
```

2. **Environment Setup**

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_BUCKET=portfolio
```

3. **Database Setup**

Run the SQL schema in your Supabase dashboard:

- Go to Supabase Dashboard → SQL Editor
- Paste and execute the contents of `supabase/schema.sql`

4. **Storage Setup**

Create a storage bucket named `portfolio` in Supabase:

- Go to Supabase Dashboard → Storage → Buckets
- Create bucket: `portfolio`
- Set to public if you want images accessible without auth

5. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

## Admin Features

The portfolio includes an admin dashboard at `/admin` for content management:

- **Authentication**: Sign in with email/password via Supabase Auth
- **Skills Management**: Add/edit technical skills with categories and proficiency levels
- **Projects**: Create and manage portfolio projects with images, descriptions, and links
- **Certifications**: Upload and display certificates with credential links
- **Experience**: Add work experience and education history

### Admin Setup

1. Enable email/password authentication in Supabase Auth settings
2. Create an admin user account
3. For production, implement Row Level Security (RLS) policies in `supabase/policies.sql`

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── projects/          # Projects listing page
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable React components
│   ├── lib/                   # Supabase client configurations
│   └── styles/                # Global styles
├── supabase/                  # Database schema and policies
├── scripts/                   # Utility scripts
└── public/                    # Static assets
```

## Database Schema

The application uses the following main tables:

- `users`: Admin user accounts
- `skills`: Technical skills with categories
- `projects`: Portfolio projects with metadata
- `experience`: Work experience and education
- `certifications`: Professional certifications

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Self-hosted with Docker

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Contributing

This is a personal portfolio project. For suggestions or improvements, please create an issue or submit a pull request.

## License

This project is private and not licensed for public use.

---

**Contact**: augustenrabi6383@gmail.com
- For development you can set the bucket to public to make files accessible via `getPublicUrl`. For production, prefer private buckets and serve signed URLs.

Signed URLs (recommended for private buckets)

- To keep your `portfolio` bucket private and still show images/PDFs inline, add `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` (server-only secret). Example:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_BUCKET=portfolio
```

- The app can then generate short-lived signed URLs for private objects (server-side) and embed them in pages. This implementation is included: the projects listing will request signed URLs when `SUPABASE_SERVICE_ROLE_KEY` is present.

- Do NOT expose the service role key to client-side code or commit it to source control.

Create bucket (Supabase dashboard):

1. Open Supabase project → Storage → Buckets → New bucket
2. Name: `portfolio`  
3. Public: optional (set to public for easy development)

After the bucket exists, the admin FileUploader will upload files to `uploads/<timestamp>_<filename>` and save the `file_key` into the related DB row (e.g., `projects.images` or `certifications.file_key`).

Security note: Allow write access to storage only for authenticated admin users, and do not expose the `SERVICE_ROLE_KEY` in client-side code.


Next steps I can take for you (choose one):
- Wire Supabase Auth for `/admin` (email+password) and implement CRUD endpoints
- Implement admin dashboard pages (skills, projects, experience, certifications)
- Add project detail pages, image uploads via Supabase Storage, and scroll-trigger animations

When you're ready, provide your Supabase project keys (via a secure channel) or connect the project to your Supabase account and I will finish the admin wiring and deployment steps.
