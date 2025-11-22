# Media Tracker

App that lets you track and rate what you watch, plan to watch, dropped, etc. Built with React in Next.js, hosted on Vercel as a playground with no user login (app contains nothing sensitive). Uses Neondb for postgres database.

This was simply a fun side project to test out Next.js, and is very unfinished. The main concept is up and running.
Take a look at [the todo/plan](./todo-plan.md) if you're curious.

The project is hosted on Vercel at https://media-tracker-green.vercel.app/.


## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database
You will need to connect to a database, see the [environment variables](./.env.example), or setup dummy data.
