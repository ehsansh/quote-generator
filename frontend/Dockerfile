# frontend/Dockerfile

# --- Stage 1: Build the React application ---
# Use a Node.js image to build the React app. We choose a slim Alpine version for smaller size.
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first.
# This leverages Docker's layer caching. If these files don't change,
# npm install won't be re-run on subsequent builds, speeding them up.
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile --silent

# Copy the rest of your application code
COPY . .

# Build the React app for production
# 'npm run build' (which resolves to 'vite build' in your package.json)
# will output the static files to the 'dist' directory by default.
RUN npm run build

# --- Stage 2: Serve the application with a lightweight web server (Nginx) ---
# Use a lightweight Nginx image for serving static files.
FROM nginx:stable-alpine

# --- IMPORTANT CHANGE: Install curl for integration testing ---
# Alpine images are minimal and don't include curl by default.
# We need it for our `docker-compose exec` command in the GitLab CI integration test.
RUN apk add --no-cache curl

# Copy the custom Nginx configuration from your local 'nginx' folder
# to the Nginx default configuration directory inside the container.
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

# Remove the default Nginx configuration to avoid conflicts
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy the built React app (from the 'build' stage) into Nginx's default
# web root directory.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (standard HTTP port) so the container can be accessed from outside.
EXPOSE 80

# Start Nginx in the foreground when the container runs.
# 'daemon off;' ensures Nginx stays running and doesn't detach,
# which would cause the Docker container to exit immediately.
CMD ["nginx", "-g", "daemon off;"]