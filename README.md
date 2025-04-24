# Grexa Website

This is a website built using Next.js and Payload CMS. The primary purpose of this template is to provide a powerful and flexible content management system combined with a modern frontend framework, which allows us to build dynamic and content-rich websites effortlessly.

Next.js is a React framework that enables features like server-side rendering, static site generation, and API routes, making it an excellent choice for modern web applications. In this template, Next.js handles the entire frontend+BFF as well as the PayloadCMS admin dashboard.

We are using pnpm as a package manager as recommended in the docs for PayloadCMS and to support a future scope of builidng a monorepo.

## Getting started

To set up and run the project locally, follow these steps:

1. Setup SSH keys for your machine and github account
2. Clone the repository - `git clone git@github.com:GrexaAI/grexa-web.git`
3. Run the setup script to copy environment variables and install dependencies
   1. Run `chmod +x setup.sh`
   2. Run `./setup.sh` to complete the setup steps
4. Set the correct environment variables in the `.env` file
5. To start the development server - `pnpm dev`
6. For production, build and start the application - `pnpm build && pnpm start`
7. You can access the user facing website at `http://localhost:3000` and the payloadCMS admin dashboard at `http://localhost:3000/admin`

## Folder Structure

We are trying to maintain a flat folder structure wherever possible for better visibility and navigation.

```text
grexa-web/
└── src/
    ├── app/
    │   ├── (frontend)
    │   │    └──(sitemaps)
    │   │       ├── pages-sitemap.xml
    │   │       └── posts-sitemap.xml
    │   └── (payload)
    ├── blocks/
    │    ├── Component.tsx
    │    └── config.ts
    ├── collections/
    ├── fields/
    ├── access/
    ├── components/
    ├── constants/
    ├── hooks/
    ├── Header/
    ├── Footer/
    ├── plugins/
    ├── providers/
    └── utlities/
```

### Key Directories and Files

#### App

- `app/(frontend)`: Contains all routing and page level code for the main user-facing website
- `app/(frontend)/(sitemap)`: Contains sitemap data fetching and building logic
- `app/(payload)`: Contains PayloadCMS which powers our user-facing website

#### Blocks

- `blocks/Component.tsx`: Custom components for rendering PayloadCMS blocks on the frontend
- `blocks/config.ts`: Configuration and data structure for PayloadCMS blocks, used for CMS data entry and TypeScript types

#### Core Directories

- `collections/`: PayloadCMS content type configurations (fields, hooks, access control, relationships)
- `fields/`: Reusable field configurations shared across collections and blocks
- `access/`: Access control logic determining who can view/edit different resources in the CMS
- `components/`: Reusable React components for the frontend
- `constants/`: Reusable constant values
- `hooks/`: Custom React hooks used in the frontend

#### Global Components

- `globals/`: Components and Config for global components/blocks such as Header, Footer

#### Supporting Directories

- `plugins/`: PayloadCMS plugin configurations and custom plugins
- `providers/`: React context providers for state management (e.g. theme)
- `utilities/`: Helper functions and utilities used throughout the application
