<img src='./frontend/public/wBackground.png' align="center" alt="Octour logo" width="300">
<br>

**Octuor** is a platform for artists to share and listen to music, modeled on [Soundcloud] (https://www.soundcloud.com/), and heavily inspired by [Spotify] (https://www.spotify.com/). It allows users to create and upload songs, view user profiles, and search for other users and songs. It uses RESTful API routes for profiles, session, songs, users, and search.

## Demo

Here is a working live demo: [https://octour.herokuapp.com](https://octour.herokuapp.com)

## Dependencies

Backend dependencies:

-   aws-s3
-   aws-sdk
-   bcryptjs
-   cookie-parser
-   cors
-   csurf
-   dotenv
-   express
-   faker
-   helmet
-   jsonwebtoken
-   morgan
-   multer
-   per-env
-   pg
-   pug
-   sequelize
-   sequelize-cli

Frontend dependencies:

-   jest
-   framer-motion
-   js-cookie
-   react
-   react-dom
-   react-redux
-   react-router-dom
-   react-soundplayer
-   redux
-   redux-thunk
-   styled-components

## Demo

Here is a working live demo: [https://octour.herokuapp.com](https://octour.herokuapp.com)

## Application Architecture

Octuor's backend server was built using Express for Node. The server has a RESTful API layer for all CRUD actions and for search. It is connected to a PostgreSQL database which leverages sequelize and it's ORM for CRUD operations.

The front end is built on React 17. It uses redux to handle global context (state) and relies heavily on thunk to dispatch async actions. It is built purely with react functional components made simple by leveraging react hooks.

---

#### Auth

For authentication the project uses jsonwebtoken and bcrypt for password hashing. For authorization it's using cookie parser to restore the token for API requests. In the front-end I uses js-cookie to extract the cookie set in the backend and a sessionsReducer to add the current user to the global store.

Below is an example of our basic auth functionality.

<!-- <img src='./public/auth-code-snippet.png' align="center" alt="Code snippet" width="400"> -->

## Backend

#### Database

<img src='./frontend/public/databse-schema.png' align="center" alt="App Database Diagram" width="800">

#### Session API

The Session API sets a token cookie upon login, registration, or restoring a user

Below is an example of how the session API works for signing in
<br />
<img src='./readmeAssets/session.png' align="center" alt="Code snippet" width="400">


#### Song API

The song API allows you to upload a mp3 file and an artwork image to an awss s3 bucket. The song upload use case is split into uploading and then editing the uploaded content. This was done this way so that even if a user exits the uploading process half way, the song will still be there.

Below is an example of how our song API works for creating a new song record.

<img src='./readmeAssets/songUpload.png' align="center" alt="Code snippet" width="400"> 

#### Search API

The search API is fairly simple and uses SQL wildcards to match search terms with song titles and usernames.

Below is an example of how our search API is working for the moment

<img src='./readmeAssets/search.png' align="center" alt="Code snippet" width="400">

---

## Pages

### Splash Page

<img src='./readmeAssets/splash.png' align="center" alt="Code snippet" width="700">

### Login (Demo)

<img src='./readmeAssets/login.png' align="center" alt="Code snippet" width="700">

### Signup

<img src='./readmeAssets/signup.png' align="center" alt="Code snippet" width="700">

### Home (Nav preview)

Our homepage is a feed of new songs and artists.

<img src='./readmeAssets/home.png' align="center" alt="Code snippet" width="700">

### Audio Player

When you click on a song you can play it using the custom audio player.

<img src='./readmeAssets/player.png' align="center" alt="Code snippet" width="700">

### Upload Song

This is the form to create a new song   

<img src='./readmeAssets/upload.png' align="center" alt="Code snippet" width="700">

### Edit Song

This is where you're taken after the song is uploaded or you manually select to edit a song

<img src='./readmeAssets/edit.png' align="center" alt="Code snippet" width="700">
<img src='./readmeAssets/edit2.png' align="center" alt="Code snippet" width="700">

### Search

The search uses redux to rerender the home page to show results as you type

<img src='./readmeAssets/search.gif' align="center" alt="Code snippet" width="700">


## Usage

### Development

Want to contribute?

To fix a bug or add a feature, follow these steps:

-   Fork the repository
-   Create a new branch with `git checkout -b feature-branch-name`
-   Make appropriate changes to the files and push back to github
-   Create a Pull Request
    -   Use a clear and descriptive title for the issue to identify the suggestion.
    -   Include any relevant issue numbers in the PR body, not the title.
    -   Provide a comprehensive description of all changes made.

#### Setting Up and Starting a Local Server

1. Download code and `npm install` to install all node dependencies
2. Create a psql db user with createdb privileges.
    - Duplicate the `.env.example` for the `dotenv` package.
    - Update the following variables:
        - `PORT` the port that the server will listen to, 8080 by default
        - `DB_USERNAME` the user of the created psql db user
        - `DB_PASSWORD` the password for the psql db user
        - `JWT_SECRET` a session secret key for encrypting session id's in the database
        - All other variables should remain the same
3. Setup PostgreSQL database
    - Run `npx dotenv sequelize db:create`
    - Run `npx dotenv sequelize db:migrate`
    - Run `npx dotenv sequelize db:seed:all`
4. Start express server by running `npm start` in the root project directory
5. The server will start on `http://localhost:8080`
