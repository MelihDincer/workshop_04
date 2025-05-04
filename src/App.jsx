import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResults from "./components/Navbar/NavSearchResults";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MovieDetails from "./components/Movies/MovieDetails";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MyMovieList from "./components/SelectedMovies/MyMovieList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovies, setselectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovieId, setselectedMovieId] = useState(null);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    total_results,
    nextPage,
    previousPage,
  } = useMovies(query);

  function handleselectedMovieId(id) {
    setselectedMovieId((selectedMovieId) =>
      id === selectedMovieId ? null : id
    );
  }

  function handleUnSelectMovie() {
    setselectedMovieId(null);
  }

  function handleAddToMovieList(movie) {
    setselectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnSelectMovie();
  }

  function handleDeleteFromMovieList(movieId) {
    setselectedMovies(selectedMovies.filter((m) => m.id !== movieId));
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResults total_results={total_results} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}
              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleselectedMovieId}
                        selectedMovieId={selectedMovieId}
                      />
                      <Pagination
                        nextPage={nextPage}
                        previousPage={previousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
                    </>
                  )}
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>

          <div className="col-md-3">
            <ListContainer>
              {selectedMovieId ? (
                <MovieDetails
                  selectedMovieId={selectedMovieId}
                  onUnSelectMovie={handleUnSelectMovie}
                  onAddToMovieList={handleAddToMovieList}
                  selectedMovies={selectedMovies}
                />
              ) : (
                <>
                  <MyListSummary selectedMovies={selectedMovies} />
                  <MyMovieList
                    selectedMovies={selectedMovies}
                    onDeleteFromMovieList={handleDeleteFromMovieList}
                  />
                </>
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}
