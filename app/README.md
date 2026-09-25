This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Credit Card Optimizer Changes
This application has been transformed into the **Credit Card Optimization Copilot**.
- **Frontend**: Built with Next.js, Tailwind CSS, and ShadCN UI. Includes a premium dark theme, mock data for a dashboard, cards, offers, AI advisor chat, and transactions.
- **Backend**: Configured Prisma ORM with SQLite for local development. Integrated NextAuth for secure credential-based authentication.
- **Why**: To provide the foundational UI and DB structure outlined in the PRD, allowing for immediate testing and future API integration.

## Change Log
- **v1.1.0**: Added `Dockerfile` and `docker-compose.yml` for seamless self-hosting. Configured Next.js standalone output.
- **v1.0.0**: Initial scaffolding of Next.js app. Generated pages, mock data, ShadCN UI components, and premium dark theme. Wired up Prisma database, NextAuth authentication, and seeded database.
