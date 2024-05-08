## Overview

This project is a Digital Site Notice web application that helps people to discover live planning applications nearby and to provide meaningful feedback in a structured way. It aims to make it easier for people to engage with planning applications, widen engagement and bring out more constructive, balanced perspectives that can improve planning development.

It is built using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The codebase is written in TypeScript which enhances code reliability, maintainability, and tooling support. The application uses https://sanity.io/ as its CMS.

## Getting Started

Ensure you have Node.js and npm (Node Package Manager) installed on your machine.

Install dependencies:

```bash
yarn install
```

### Running the development server:

To start the development server, run the following command:

```bash
yarn dev
```

This will start the Next.js development server at http://localhost:3000. Open your browser and navigate to this URL to see the application.

### Building for Production

To build the application for production, run the following command:

```bash
yarn build
```

This will generate an optimized production build.

### Running the Production Build

To start the production server, run the following command:

```bash
yarn start
```

This will start the Next.js production server at `http://localhost:3000`.

## Testing

The project is using [Jest](https://jestjs.io/) for testing.

Run the tests:

```bash
yarn test
```

Update the test snapshots:

```bash
yarn test:update
```

## Environment setp

Ensure that the .env or .env.local file also has the following environment keys :

|          Variable Name          | Value |
| :-----------------------------: | :---: |
| NEXT_PUBLIC_SANITY_SECRET_TOKEN |  ###  |
|  NEXT_PUBLIC_SANITY_PROJECT_ID  |  ###  |
|   NEXT_PUBLIC_SANITY_DATASET    |  ###  |
|       NEXT_PUBLIC_API_KEY       |  ###  |
|       NEXT_PUBLIC_API_URL       |  ###  |
|   NEXT_PUBLIC_SPREADSHEET_ID    |  ###  |
|      NEXT_PUBLIC_SHEET_ID       |  ###  |
| NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL |  ###  |
|     NEXT_PUBLIC_ENVIRONMENT     |  ###  |
|        SENDGRID_API_KEY         |  ###  |
|        FEEDBACK_TO_EMAIL        |  ###  |
|       FEEDBACK_FROM_EMAIL       |  ###  |
|   GOOGLE_SERVICE_PRIVATE_KEY    |  ###  |
| NEXT_PUBLIC_COOKIE_CONTROL_KEY  |  ###  |
|   GOOGLE_SERVICE_PRIVATE_KEY    |  ###  |

The environment variables are also shown in the .env.example file. Copy the variables and add the values to a new .env file.

## CMS setp

The application uses https://sanity.io/ as its cms. When the application is running navigate to http://localhost:3000/studio to get access to the CMS.

Data schemas are stored in /sanity/schemas.

## Project Structure

The project structure follows the Next.js App Router conventions and includes [Route Group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) folder structure to provide a clear separation of concerns between the main application routes and the Sanity Studio routes within the `app/` directory. Here are some of the core folders and files:

- `__tests__/`: Contains Jest test suites.
- `sanity/`:
  - `lib/`: Library files specific to Sanity, such as client configurations.
  - `schemas/`: Holds the schema definitions for the datasets, which define the structure of the data used in Sanity.
  - `structure/`:
- `public/`: Contains static assets such as images, icons, etc.
- `src/`: The primary directory where the source files of the project reside.

  - `app/`: This directory hosts the core of the Next.js application.

    - `(main)/`: Route Group - Dynamic route group for main application.
      - `page.tsx`: The main listing page component that displays live planning applications (includes postcode search functionality.)
      - `planning-applications/`:
        - `[id]/`: Dynamic route for a specific planning application.
          - `page.tsx`: The page component for a specific ID within a council.
    - `(studio)/`: Route Group - Sanity Studio's specific routing and pages.
      - `studio/`:
        - `[[..index]]/`:
          - `layout.tsx`: Layout component for Sanity Studio.
          - `page.tsx`: Main studio page.
    - `actions/`:
    - `api/`: Dedicated to API route files that handle server-side logic.
    - `lib/`: Includes libraries and helper functions that are used across various components of the application.
    - `components/`: Contains reusable React components used throughout the application.
    - `styles/`: Contains CSS / Sass stylesheets for styling the application.
