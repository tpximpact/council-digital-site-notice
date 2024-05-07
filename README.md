## Overview

This project is a digital site notice web application that helps people discover property development planning applications nearby.

It is built using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

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

Ensure that the .env or .env.local file also has the following environment Keys:

|          Variable Name          | Value |
| :-----------------------------: | :---: |
| NEXT_PUBLIC_SANITY_SECRET_TOKEN |  ###  |
|  NEXT_PUBLIC_SANITY_PROJECT_ID  |  ###  |
|   NEXT_PUBLIC_SANITY_DATASET    |  ###  |
|       NEXT_PUBLIC_API_KEY       |  ###  |
|   NEXT_PUBLIC_SPREADSHEET_ID    |  ###  |
|      NEXT_PUBLIC_SHEET_ID       |  ###  |
| NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL |  ###  |
|   GOOGLE_SERVICE_PRIVATE_KEY    |  ###  |
|       NEXT_PUBLIC_API_URL       |  ###  |

## CMS setp

The application uses https://sanity.io/ as its cms. When the application is running navigate to http://localhost:3000/studio to get access to the CMS.

Data schemas are stored in /sanity/schemas.
