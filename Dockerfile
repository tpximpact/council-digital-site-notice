# Use official Node.js image as the base image, set to Node.js v20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]