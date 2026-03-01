# Serverless LeetCode Progress Tracker

Fully automated serverless tracker using:

- Java (data fetcher)
- GitHub Actions (scheduler)
- React + Vite (dashboard)
- Vercel (deployment)

## Run locally

Backend:

cd backend-java
mvn clean package
mvn exec:java

Frontend:

cd frontend
npm install
npm run dev
