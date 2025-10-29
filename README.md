# AI Builder - AI-Powered Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

> Build apps, websites, landing pages, and presentations using simple text prompts - all powered by AI.

## 🚀 Features

- **AI Code Generation** - Describe your project and watch AI generate complete, production-ready code
- **Live Preview** - See your project come to life with real-time preview and editing
- **Multiple Project Types**
  - Websites (multi-page with navigation)
  - Landing Pages (high-converting single pages)
  - React Apps (interactive SPAs)
  - Admin Panels (dashboards with data visualization)
  - Presentations (slide decks)
- **Code Editor** - Monaco editor with syntax highlighting and intellisense
- **Export Options**
  - Download as ZIP file
  - One-click deploy to Vercel (coming soon)
- **User Authentication**
  - Email/Password authentication
  - Google OAuth
  - Secure session management
- **Project Management**
  - Save and organize your projects
  - Dashboard with usage statistics
  - Project history and versioning

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** SQLite (Prisma ORM)
- **Authentication:** NextAuth.js
- **Editor:** Monaco Editor
- **Styling:** Tailwind CSS
- **Deployment:** Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🏃 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/khajaaijaz26/Spotify-Analysis.git
cd Spotify-Analysis
```

> **Note:** This repository was originally a Spotify analysis project and has been transformed into the AI Builder platform.

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database (SQLite for local development)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI API (for production AI integration)
AI_API_KEY="your-ai-api-key"
AI_API_URL="https://api.openai.com/v1"
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/        # Authentication endpoints
│   │   ├── generate/    # AI code generation
│   │   ├── projects/    # Project CRUD operations
│   │   └── export/      # ZIP export functionality
│   ├── auth/            # Authentication pages
│   ├── create/          # Code editor and generator
│   ├── dashboard/       # User dashboard
│   ├── templates/       # Template gallery
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── ui/             # UI components
│   ├── Navbar.tsx      # Navigation bar
│   └── AuthProvider.tsx # Auth context provider
├── lib/                 # Utility functions
│   ├── auth.ts         # NextAuth configuration
│   └── prisma.ts       # Prisma client
├── prisma/             # Database schema
│   └── schema.prisma   # Prisma schema
└── public/             # Static assets
```

## 🎨 Using the Platform

### Creating a Project

1. **Sign In** - Create an account or sign in with Google
2. **Choose Template** - Browse templates or start from scratch
3. **Describe Your Project** - Enter a text prompt describing what you want to build
4. **Generate Code** - Click "Generate Code" and watch AI create your project
5. **Edit & Preview** - Make changes in the code editor and see live preview
6. **Save & Export** - Save to your dashboard or download as ZIP

### Example Prompts

- "A portfolio website for a photographer with gallery and contact form"
- "A SaaS landing page with pricing table and testimonials"
- "A React todo app with dark mode"
- "An admin dashboard with user management and analytics"
- "A startup pitch presentation with 5 slides"

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
```

## 🔒 Security

- All user inputs are sanitized
- Authentication with secure sessions
- Environment variables for sensitive data
- CORS and rate limiting (production)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Monaco Editor for the code editor
- Tailwind CSS for styling

## 📧 Support

For support, email khajaaijaz26@gmail.com or open an issue in the repository.

---

Built with ❤️ using Next.js and AI

