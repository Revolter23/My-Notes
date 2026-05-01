# Notes App

A modern, full-stack notes application built with Next.js that allows users to perform Create, Read, Update, and Delete (CRUD) operations on their personal notes. The app features user authentication, secure session management, and a responsive design using Material-UI and Tailwind CSS.

## Features

- **User Authentication**: Secure login and sign-up functionality with encrypted passwords and JWT-based sessions
- **CRUD Operations**: Create new notes, view existing notes in a card-based dashboard, edit notes with a rich form interface, and delete notes
- **Responsive Design**: Mobile-friendly interface with a clean, modern UI
- **Database Integration**: PostgreSQL database for reliable data storage and querying
- **Session Management**: Secure cookie-based sessions with automatic redirects for authenticated/unauthenticated users

## Tech Stack

- **Frontend**: Next.js 16 with React 19, TypeScript
- **Styling**: Material-UI (MUI) with Tailwind CSS
- **Backend**: Next.js API routes with PostgreSQL
- **Authentication**: Custom JWT implementation with bcrypt for password hashing
- **Database**: PostgreSQL with the `postgres` library for queries
- **Development Tools**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager
- PostgreSQL database

### Installation

1. Clone the repository and navigate to the notes-app directory:

    ```bash
    cd notes-app
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Set up your PostgreSQL database and create a `.env.local` file in the root directory with your database connection string:

    ```
    POSTGRES_URL=your_postgresql_connection_string_here
    ```

4. Create the necessary database tables by running the SQL script in `app/seed/query.sql` against your PostgreSQL database.

5. Start the development server:

    ```bash
    pnpm dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seeding the Database (Optional)

To populate the database with sample notes, visit `http://localhost:3000/seed` after logging in. This will insert sample data for the authenticated user.

## Usage

1. **Sign Up/Login**: Create an account or log in with existing credentials
2. **Dashboard**: View all your notes in a grid layout
3. **Create Note**: Click the add icon to create a new note
4. **Edit Note**: Click on any note card to view and edit its content
5. **Delete Note**: Use the delete option within the note editor

## Project Structure

- `app/` - Next.js app directory with pages and API routes
- `app/_lib/` - Database access layer and utility functions
- `app/(authhome)/` - Authentication-related pages
- `app/notes/` - Notes management pages and components
- `public/` - Static assets

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Material-UI Documentation](https://mui.com/)
