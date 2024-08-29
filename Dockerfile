# 1. Use the official Node.js 20 image as the base image
FROM node:20-alpine AS build

# 2. Accept build-time environment variables from Heroku
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET

# 3. Set the working directory in the container
WORKDIR /app

# 4. Copy the yarn.lock and package.json files to the container
COPY package.json yarn.lock ./

# 5. Install dependencies
RUN yarn install --frozen-lockfile

# 6. Copy the rest of the application source code to the container
COPY ./src ./src

# 7. Set environment variables for the build process (making them available to Next.js)
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

# 8. Build the Next.js app
RUN yarn build

# 9. Use a smaller base image for the final build
FROM node:20-alpine AS runner

# 10. Set environment variables for runtime
ENV NODE_ENV=production

# 11. Set the working directory in the container
WORKDIR /app

# 12. Copy the built application from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# 13. Expose the port the app runs on
EXPOSE 3000

# 14. Command to run the Next.js application
CMD ["yarn", "start"]
