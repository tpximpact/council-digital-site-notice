<p align="center">
    <a href="https://github.com/tpximpact/council-digital-site-notice">
        <img src="./council-digital-site-notice.png" width="450px" />               
    </a>
</p>

## Introduction

This project is a Digital Site Notice web application that helps people to discover live planning applications nearby and to provide meaningful feedback in a structured way. It aims to make it easier for people to engage with planning applications, widen engagement and bring out more constructive, balanced perspectives that can improve planning development.

It is built using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The codebase is written in TypeScript which enhances code reliability, maintainability, and tooling support. The application uses https://sanity.io/ as its CMS.

## Requirements

In order to use this application you will need to have accounts with the following third party services:

- [sanity.io](https://www.sanity.io/) - 🚨 required!
- [google cloud](https://cloud.google.com/) - required to support saving comments to a google sheet
- [sendgrid](https://sendgrid.com/) - required to support sending comments as an email from: `FEEDBACK_FROM_EMAIL` to: `FEEDBACK_TO_EMAIL`

## Getting started

### Running the application locally

Ensure you have Node.js and yarn installed on your machine.

#### Install dependencies:

```bash
yarn install
```

#### Running the development server:

To start the development server, run the following command:

```bash
yarn dev
```

This will start the Next.js development server at http://localhost:3000. Open your browser and navigate to this URL to see the application.

### Accessing sanity studio

The application uses https://sanity.io/ as its cms. When the application is running navigate to http://localhost:3000/studio to get access to the CMS.

Data schemas are stored in /sanity/schemas.

## Features

### Emails

Emails are sent when a comment is added.

🚨 Without a sendgrid account no emails will be sent

### Commenting and feedback

When submitting comments an email is sent from: `FEEDBACK_FROM_EMAIL` to: `FEEDBACK_TO_EMAIL` with the comment in the email body.

Additionally a new entry is added to the google spreadsheet defined in the configuration below.

🚨 Without a google account and google cloud account comments will not be added to a spreadsheet
🚨 Without a sendgrid account no emails will be sent

### Content management (sanity.io)

🚨 Without a sanity account this application wont display anything

This project connects to an API to fetch and display live planning application data. Data is synced into [Sanity](https://sanity.io/). The required API configurations are stored in environment variables.

Within Sanity Studio, users are able to apply Global Content configurations and create/edit planning applications.

#### Global content

Global content lets you configure certain content and settings for your site.s

This application supports three integration methods.

#### Manual

Data is added manually using sanity studio

#### OpenAPI

Data is added by creating syncing with `NEXT_PUBLIC_API_URL`

Simply add a valid Application Number to a planning application, scroll to Integrations and hit the Fetch from OpenAPI button. This then pulls in the following data: `application_type, name, development_address, development_description, location - latitude, longitude, applicationDocumentsUrl`. If the fields have a value it will display on Sanity.

If the application number is invalid it will error and will not be able to sync any data.

#### UniformAPI

When integrating with UniformAPI you can point your workflow to `/api/application` or `/api/applications` to POST data into sanity studio, you will need to include the value set in `OUR_API_KEY` in your `x-api-key` header to authenticate with the DSN.

For more information on the API end points see `/api-docs`

## Deploying the application

> 🚨 You will need to ensure that you have the `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` environmental variables set in order to build the application

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

### Building for Production in Docker

To build the image run:

```bash
docker build --pull --rm \
--build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=a \
--build-arg NEXT_PUBLIC_SANITY_DATASET=b \
-t council-digital-site-notice:latest .
```

### Running the Docker image

To run the image in a container:

```bash
docker run \
-p 3000:3000 \
--name council-digital-site-notice \
--env-file ./.env \
-d council-digital-site-notice:latest
```

#### use ngrok to view behing https

```bash
ngrok http 3000
```

## Configuration

You can provide config with a `.env` file. Run `cp sample.env .env` to create a fresh one.

### OUR API

| Variable      | Description                                                                                              | Example                        | Required?                                      |
| ------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------- |
| `OUR_API_KEY` | API key an application must send and match against in order to add data to the sanityCMS through the DSN | `complex-passphrase-goes-here` | Only if using the API to add data to sanityCMS |

### EMAILS

| Variable              | Description                            | Example              | Required?                   |
| --------------------- | -------------------------------------- | -------------------- | --------------------------- |
| `SENDGRID_API_KEY`    | API key for sendgrid                   | `api-key`            | Only if using email feature |
| `FEEDBACK_TO_EMAIL`   | Email address to send replies to       | `council@email.com`  | Only if using email feature |
| `FEEDBACK_FROM_EMAIL` | Email address emails will be sent from | `no-reply@email.com` | Only if using email feature |

### COMMENTS & FEEDBACK

| Variable                          | Description                                             | Example                                                            | Required?                        |
| --------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_SPREADSHEET_ID`      | ID for spreadsheet where comments are stored            | `api-key`                                                          | Only if using commenting feature |
| `NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL` | Google service account authorised to update spreadsheet | `google-service-account@google.cloud.com`                          | Only if using commenting feature |
| `GOOGLE_SERVICE_PRIVATE_KEY`      | Private key for google cloud account                    | `-----BEGIN PRIVATE KEY-----\nthings\n-----END PRIVATE KEY-----\n` | Only if using commenting feature |

### SANITY STUDIO

| Variable              | Description                | Example   | Required?                                                |
| --------------------- | -------------------------- | --------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL for public data source | `api-key` | Only if integrationMethod fetches data from a public api |

### SANITY

| Variable                        | Description                                            | Example      | Required? |
| ------------------------------- | ------------------------------------------------------ | ------------ | --------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | project ID in sanity.io                                | `123abc`     | Yes       |
| `SANITY_SECRET_TOKEN`           | API token in sanity.io, has permissions to update data | `api-key`    | Yes       |
| `NEXT_PUBLIC_SANITY_DATASET`    | Name of dataset in sanity.io                           | `production` | Yes       |

## Testing the application

The project is using [Jest](https://jestjs.io/) for testing.

#### Run the tests:

```bash
yarn test
```

#### Update the test snapshots:

```bash
yarn test:update
```

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
