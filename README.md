# EJWatch

EJWatch is a React-based movie and TV discovery application that uses the **TMDB API** to search for movies and TV shows and display trending media.


## Features

- Search for movies and TV shows
- View trending media
- Different displayed genres such as Romance, Action, etc...
- Compatible with Accessibility Software
- Responsive interface

## Technologies

- **React**
- **JavaScript**
- **HTML**
- **CSS**
- **TMDB API**
- **Vite**

## How It Works

EJWatch retrieves movie and TV show information from the TMDB API.

The application uses different TMDB endpoints depending on the user's action such as:

- **Home:** Displays trending movies and TV shows
- **Search:** Searches for movies and TV shows based on the user's query
- **Movies:** Displays movie-related content
- **TV Shows:** Displays TV-related content

The application uses React's Context API to share movie/media data between components.

### Example Search

User enters a search → React captures the search term

TMDB API request → API returns media results

Context updates application state → MovieCard components render the results


## Project Structure

```text
src/
├── App.jsx
├── Context.jsx
├── Header.jsx
├── SearchMovies.jsx
├── MovieCard.jsx
├── main.jsx
└── ...
```

## API

EJWatch uses the [TMDB API](https://developer.themoviedb.org/docs) to retrieve movie and TV show information.

This project uses the TMDB API but is not endorsed or certified by TMDB.

## Environment Variables

The TMDB Read Access Token is stored in an environment variable rather than directly inside the source code.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/EJWatch.git
```

### 2. Navigate into the project

```bash
cd EJWatch
```

### 3. Install dependencies

```bash
npm install
```

### 4. Add your TMDB API token

Create a `.env` file:

```env
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.


## NOTE

EJWatch is a personal learning project created for educational purposes.

Movie and TV show information is provided by the TMDB API.
