# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Set the command to run when the container starts
CMD ["npm", "start"]

# Expose the port on which the app is running
EXPOSE 3000
