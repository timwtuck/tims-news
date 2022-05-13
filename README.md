# Tims News - Portfolio React Web App

deployed at: https://tims-news.netlify.app/

## Project Overview

- Tims News is a reddit style react web app where users can post, read, and comment upon articles.
- Articles can be filtered by category, and sorted with a variety of metrics.
- All articles and comments can be voted upon with upvotes, or downvotes.
- In this example app, you are automatically signed in as tickle122, but providing a different valid username (without a password) on the sign in page will log you in as a different user.

## Backend

- Articles, users and comments are retrieved via an api hosted at https://timmyt-news.herokuapp.com/api .
- The backend for this project was also written by me and can be found at https://github.com/timwtuck/nc-news

## Running Project Locally

Node Version > v17.5

- clone this repo

```sh
git clone https://github.com/timwtuck/tims-news.git
```

- cd into the project directory and install npm dependencies

```sh
npm install
```

- run the app on your local machine

```sh
npm start
```
