# Use Node.js version 22 as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the exact dependency versions pinned in package-lock.json
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:dev"]
