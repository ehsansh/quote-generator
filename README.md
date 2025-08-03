# Quote Generator Full Stack Project

## Overview
This is a simple full stack web application that displays random quotes. The frontend is built with React and the backend is a Node.js/Express server. The backend fetches quotes from an external API and serves them to the frontend.

## How It Works
- **Frontend:** A React app displays a random quote and allows users to fetch new quotes.
- **Backend:** A Node.js/Express server provides an API endpoint (`/api/quote`) that fetches a random quote from an external API and returns it to the frontend.
- **Docker:** Both frontend and backend are containerized using Docker. Nginx is used to serve the frontend and proxy API requests to the backend.
- **CI/CD:** The project leverages **both GitLab CI/CD pipelines and GitHub Actions** to automate linting, testing, building Docker images, running integration tests, and deploying the application.

## Key Features
- **Full Stack:** Combines a React frontend and Node.js backend.
- **API Integration:** Backend fetches quotes from an external API and serves them to the frontend.
- **Dockerized:** Both services run in separate containers for easy deployment and scalability.
- **Nginx Proxy:** Nginx serves the frontend and proxies API requests to the backend.
- **Comprehensive CI/CD Pipeline:** Automated pipelines in **GitLab and GitHub Actions** for linting, testing, building, integration testing, and deployment.

## What I Learned
- How to build and connect a full stack app using React and Node.js.
- How to use Docker to containerize both frontend and backend services.
- How to configure Nginx as a reverse proxy for API requests.
- How to set up and use **both GitLab CI/CD and GitHub Actions** for automated testing, building, and deployment.
- How to troubleshoot networking and configuration issues in Docker and CI/CD environments.

## Why This Project
I created this project to learn and demonstrate:
- Building a full stack application from scratch.
- Containerizing applications with Docker.
- Implementing a complete CI/CD workflow using **both GitLab and GitHub Actions**.
- Connecting frontend and backend services in a production-like environment.

## Repository Links
- [Frontend-only version (GitLab)](https://gitlab.com/shanshadmehri/quote-generator)
- This repository: Full stack version with GitHub Actions and Docker
- [Full stack version with GitLab CI/CD](https://gitlab.com/shanshadmehri/quote-generator-fullstack) 

## How to Run Locally
1. Clone the repository.
2. Run `docker-compose up --build` to start both frontend and backend containers.
3. Open `http://localhost` in your browser to use the app.

## CI/CD Pipeline
- Lint and test both frontend and backend.
- Build Docker images and push to GitLab Container Registry (for GitLab CI/CD) or GitHub Container Registry/Docker Hub (for GitHub Actions).
- Run integration tests using Docker Compose.
- Deploy the application (placeholder for production/staging deployment).

---
This project demonstrates my understanding of full stack development, Docker, and CI/CD automation. If you have any questions, feel free to contact me!