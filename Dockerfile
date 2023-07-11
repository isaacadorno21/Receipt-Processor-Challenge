# Grab the node.js offical image
# https://hub.docker.com/_/node
FROM node:18.16.1-alpine

# Set the working directory
WORKDIR /project

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy local code to the container image
COPY . .

# Make port 3000 available outside this container
EXPOSE 3000

# Run on container startup
CMD [ "npm", "start" ]
