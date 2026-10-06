# EJWatch

EJWatch is a React-based movie and TV discovery application powered by the [TMDB API](https://www.themoviedb.org/).

The project allows users to browse popular media, search for movies and TV shows, and view basic information such as posters, release dates, and media types.

## Features

- Browse trending movies and TV shows
- Search for movies and TV shows
- Display movie and TV show posters
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

## Credits

Movie and TV information is provided by [TMDB](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed by TMDB.
