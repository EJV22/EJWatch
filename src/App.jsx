import ContextProvider from "./Context.jsx";
import SearchMovies from "./SearchMovies.jsx";
import Header from "./Header.jsx";

function App() {

  return(
    <>
      <ContextProvider>
        <Header/>
        <SearchMovies/>
      </ContextProvider>
    </>
  );
}

export default App;
