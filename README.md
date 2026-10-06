# EJWatch

EJWatch is a React-based movie and TV discovery application powered by the [TMDB API](https://www.themoviedb.org/).

The project allows users to browse popular media, search for movies and TV shows, and view basic information such as posters, release dates, and media types.

## Features

- Browse trending movies and TV shows
- Search for movies and TV shows
- Display movie and TV show posters
- Display release dates and first air dates
- Identify whether a result is a movie or TV show
- Search using the TMDB API
- Responsive movie/TV card layout
- Keyboard-accessible search functionality
- Carousel navigation for browsing results

## Technologies

- **React**
- **JavaScript**
- **HTML**
- **CSS**
- **Vite**
- **TMDB API**
- **Git & GitHub**

## How It Works

EJWatch uses the TMDB API to retrieve movie and TV show information.

The application uses different TMDB endpoints depending on what the user is doing:

- **Home:** Displays trending movies and TV shows
- **Search:** Searches for movies and TV shows based on the user's input
- **Movie results:** Displays movie-specific information
- **TV results:** Displays TV-specific information

The application stores API results in React Context so that different components can access the current movie and TV data.

## Project Structure

```text
EJWatch/
├── public/
├── src/
│   ├── App.jsx
│   ├── Context.jsx
│   ├── Header.jsx
│   ├── MovieCard.jsx
│   ├── SearchMovies.jsx
│   └── ...
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Main Components

### `Context.jsx`

Handles the application's shared movie and TV show data.

It also handles requests to the TMDB API and provides the `search()` function to other components through React Context.

### `Header.jsx`

Contains the main navigation and search interface.

Users can navigate between the home page, movies, and TV shows, as well as search for specific titles.

### `SearchMovies.jsx`

Displays the current search or trending results and handles carousel navigation.

### `MovieCard.jsx`

Displays individual movie or TV show information, including:

- Poster
- Title
- Release year
- Media type

## Environment Variables

EJWatch uses a TMDB Read Access Token to communicate with the TMDB API.

Create a `.env` file in the root of the project:

```env
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

The token is accessed in the application using:

```js
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
```

The `.env` file should **not** be committed to GitHub.

For deployment, the environment variable should be configured through the hosting provider's environment variable settings.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/EJWatch.git
```

### 2. Navigate into the project

```bash
cd EJWatch
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your environment file

Create a `.env` file in the project root:

```env
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

### 5. Start the development server

```bash
npm run dev
```

Vite will provide a local development address, usually:

```text
http://localhost:5173/
```

## Learning Outcomes

This project was built to practice working with:

- React components
- React Context API
- State management
- API requests with `fetch()`
- Environment variables
- Conditional rendering
- Handling movie and TV data from an external API
- Vite
- Git and GitHub
- Responsive frontend design

## Future Improvements

Some possible future improvements include:

- Individual movie and TV show detail pages
- Genre filtering
- Improved search results
- Watchlist functionality
- More detailed movie information
- Trailer integration
- Pagination or expanded carousel navigation
- Improved loading and error states

## Credits

Movie and TV information is provided by [TMDB](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Disclaimer

EJWatch is a personal learning project created to practice frontend development and working with external APIs.
