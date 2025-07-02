# Use Node.js version 20 as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Build the application
# RUN npm run build

# Run the application
CMD ["npm", "run", "start:dev"]