ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET

# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine as base


# ////////////////////////////// baseimg
FROM base as baseimg
# python needed by deps and builder
RUN apk add --no-cache \
  python3 \
  make \
  g++ 

# ////////////////////////////// dependencies
FROM baseimg as deps
ENV HUSKY=0
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# we dont want it to install chrome as it will fail in alpine - also we're not running tests in this container but we need dev dependencies to build the app 🤷‍♀️
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY yarn.lock ./
COPY package.json ./
# Husky install file needed too
COPY .husky/install.mjs ./.husky/install.mjs
# Install dependencies
RUN yarn --frozen-lockfile

# ////////////////////////////// build
FROM baseimg as builder
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${NEXT_PUBLIC_SANITY_PROJECT_ID}
ENV NEXT_PUBLIC_SANITY_DATASET=${NEXT_PUBLIC_SANITY_DATASET}

ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build
CMD ["tail", "-f", "/dev/null"]

# ////////////////////////////// run
FROM base AS runner
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


# we want to use output:standalone but it doesn't seem to want to work yet
# I suspect something to do with sanity plugin
# for now we will keep the standalone structure in the dockerfile but we'll just copy
# everything over to the final step and run it the old fashioned way 
COPY --from=builder /app/ ./

# @TODO uncomment when we can run output:'standalone'
# COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD yarn start
