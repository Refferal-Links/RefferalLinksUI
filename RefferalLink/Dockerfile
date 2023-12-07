# Use the official Node.js image as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 80

# Define the command to run your application
CMD ["npm", "run", "serve"]
