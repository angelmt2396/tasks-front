# Tasks Frontend

This is a Next.js project bootstrapped with create-next-app.

## Introduction
This is a frontend application built with Next.js for task management. The application allows creating, viewing, and managing tasks efficiently.

## Installation

### Prerequisites

```bash
- Node.js >= 20.x.x
```

### Documentation

```bash
- [Next.js]https://nextjs.org/docs)
- [GIT](https://git-scm.com/)
- [React](https://legacy.reactjs.org/docs/getting-started.html)
- [Tailwind CSS](https://v2.tailwindcss.com/docs)
- [Eslint](https://eslint.org/docs/latest/)
- [App Router](https://nextjs.org/docs/app)
```
```bash
- Node.js >= 20.x.x
```

```bash
npm install
# or
yarn install
# or
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```
## Project Structure

- **`public/`**: Static files.
    - `images/`: Images used in the application.
    - `next.svg`, `vercel.svg`: Next.js and Vercel logos.
- **`src/`**: Application source code.
    - `app/`: Main routes.
        - `tasks/`: Task management.
            - `[id]/page.js`: Specific task page based on ID.
            - `create/page.js`: Page to create tasks.
            - `page.js`: Main tasks page.
        - `users/page.js`: Users page.
        - `favicon.ico`
        - `globals.css`: Global styles.
        - `layout.js`: Application layout.
        - `page.js`: Main application page.
    - `components/`: Reusable components.
        - `tasks/`: Task-related components.
            - `task-item.js`, `task-lists.js`
        - `alert.js`
        - `card-home.js`
        - `confirm-modal.js`
        - `datetime-input.js`
        - `error-modal.js`
        - `header.js`
        - `loading.js`
        - `pagination.js`
    - `config/`: Configuration files.
        - `environments.js`
    - `services/`: Services to interact with APIs.
        - `tasks.js`
        - `teams.js`
        - `users.js`
    - `utils/`: Utilities and helper functions.
        - `custom-http.js`
        - `date.js`
        - `strings.js`
- **`.eslintrc.json`**: ESLint configuration.
- **`.gitignore`**: Files and folders to be ignored by Git.
- **`jsconfig.json`**: JavaScript configuration.
- **`next.config.mjs`**: Next.js configuration.
- **`package.json`**: Project information and dependencies.
- **`package-lock.json`**: Dependency lock file.
- **`postcss.config.mjs`**: PostCSS configuration.
- **`README.md`**: Project documentation.
- **`tailwind.config.js`**: Tailwind CSS configuration.
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
