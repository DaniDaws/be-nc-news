# Northcoders News API

---

A hosted version of this project can be found at https://be-nc-news-r6yn.onrender.com/api, suffix the url with the path that you wish to access (e.g. /topics).

---

## Summary

Northcoders News API is a RESTful API designed to provide programmatic access to a relational database of news articles. The API supports CRUD operations on articles, topics, users, and comments, allowing developers to interact with the data in a structured and efficient manner.

---

## Prerequisites

Make sure you have the following software installed on your machine:
Node.js: Minimum version required is 16.x
Postgres: Minimum version required is 13.x

---

## Installation

1. Clone the repository
2. Install dependencies (npm install)
3. You need to create two .env files: .env.development and .env.test. As environment variables are omitted for security reasons, in order to successfully connect to the test and development databases locally, a developer must create the .env files manually.
4. Fill in the necessary environment variables in each file. Here you should define the PGDATABASE you wish to utilise.
5. Setup and seed the local database. Make sure your Postgres server is running and you have created a database for the project. Then run:
   npm run setup-dbs
   npm run seed
6. Run tests. To ensure everything is set up correctly, run the test suite (npm test)

---

## Running the Application

After completing the installation steps, you can run the application using: npm start
This will start the server.

---

## API Endpoints

The API provides the following endpoints:<br><br>

- **GET /api/topics** - Retrieve all topics
- **GET /api/articles** - Retrieve all articles
- **GET /api/articles/:article_id** - Retrieve a specific article by ID
- **GET /api/articles/:article_id/comments** - Retrieve comments for a specific article
- **POST /api/articles/:article_id/comments** - Post a new comment on a specific article
- **PATCH /api/articles/:article_id** - Update the votes of a specific article
- **DELETE /api/comments/:comment_id** - Delete a specific comment
- **GET /api/users** - Retrieve all users
- **GET /api** - Retrieve all available endpoints

---

## Acknowledgments

This project was created as part of the Northcoders Digital Skills Bootcamp in Software Engineering.
Thanks to Northcoders for providing the guidance and resources to build this project.
