    # Use an Alpine-based Node.js container as the build stage
    FROM node:18-alpine AS build
    
    # Set the working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install --legacy-peer-deps
    
    # Copy the rest of the application
    COPY . .
    
    # Build the application
    RUN npm run build
    
    # Use a lightweight Nginx container to serve the application
    FROM nginx:alpine
    
    # Copy the build output from the build stage
    COPY --from=build /app/build /usr/share/nginx/html
    
    # Expose port 80 for the container
    EXPOSE 80
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]