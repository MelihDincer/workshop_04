import { useEffect, useState } from "react";

const movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  },
];

const seleted_movie_list = [
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    duration: 120,
    rating: 8.4,
  },
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    duration: 110,
    rating: 9.2,
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    duration: 125,
    rating: 8.8,
  },
];

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value / array.length, 0);

const api_key = "8026a27df6698ce2cd7ba34fbb8bf5f8";

export default function App() {
  const [query, setQuery] = useState("father");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(seleted_movie_list);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnSelectMovie() {
    setSelectedMovie(null);
  }

  useEffect(
    function () {
      async function getMovies() {
        try {
          setLoading(true);
          setError("");
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
          );
          // url hatalı ise
          if (!response.ok) {
            throw new Error("Bilinmeyen bir hata oluştu");
          }
          const data = await response.json();

          if (data.total_results === 0) {
            throw new Error("Film bulunamadı.");
          }
          setMovies(data.results);
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      }

      if (query.length < 4) {
        setMovies([]);
        setError("");
        return;
      }
      getMovies();

      // fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setMovies(data.results), setSelectedMovies(data.results);
      //   });
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResults movies={movies} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}
              {loading && <Loading />}
              {!loading && !error && (
                <MovieList
                  movies={movies}
                  onSelectMovie={handleSelectedMovie}
                  selectedMovie={selectedMovie}
                />
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>

          <div className="col-md-3">
            <ListContainer>
              <MyListSummary selectedMovies={selectedMovies} />
              <MyMovieList selectedMovies={selectedMovies} />

              {selectedMovie && (
                <MovieDetails
                  selectedMovie={selectedMovie}
                  onUnSelectMovie={handleUnSelectMovie}
                />
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <div className="alert alert-danger">{message}</div>;
}

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "61vh",
      }}
    >
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function Nav({ children }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">{children}</div>
      </div>
    </nav>
  );
}

function Main({ children }) {
  return <main className="container">{children}</main>;
}

function ListContainer({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpen((val) => !val)}
      >
        {isOpen ? (
          <i className="bi bi-chevron-down"></i>
        ) : (
          <i className="bi bi-chevron-up"></i>
        )}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie, selectedMovie }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie, index) => (
        <Movie
          movie={movie}
          onSelectMovie={onSelectMovie}
          selectedMovie={selectedMovie}
          key={index}
        />
      ))}
    </div>
  );
}

function MovieDetails({ selectedMovie, onUnSelectMovie }) {
  return (
    <div>
      <p className="alert alert-primary">{selectedMovie}</p>
      <button className="btn btn-danger" onClick={onUnSelectMovie}>
        Kapat
      </button>
    </div>
  );
}

function Movie({ movie, onSelectMovie, selectedMovie }) {
  return (
    <div className="col mb-2">
      <div
        className={`card movie ${
          selectedMovie == movie.id ? "selected-movie" : ""
        }`}
        onClick={() => onSelectMovie(movie.id)}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500` + movie.poster_path
              : "/img/noimage.png"
          }
          alt={movie.title}
          className="card-img-top"
          style={{ height: "300px" }}
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.release_date.split("-")[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyListSummary({ selectedMovies }) {
  const avgRating = getAverage(seleted_movie_list.map((movie) => movie.rating));
  const avgDuration = getAverage(
    seleted_movie_list.map((movie) => movie.duration)
  );
  return (
    <div className="card mb-2">
      <div className="card-header">
        <h5 style={{ fontFamily: "cursive" }}>
          Listeye [{selectedMovies.length}] film eklendi.
          <div className="d-flex mt-2">
            <p>
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span className="fs-6">{avgRating.toFixed(0)}</span>
            </p>
            <p className="ms-3">
              <i className="bi bi-stopwatch-fill text-danger me-1"></i>
              <span className="fs-6">{avgDuration.toFixed(0)}</span>
            </p>
          </div>
        </h5>
      </div>
    </div>
  );
}

function MyMovieList({ selectedMovies }) {
  return (
    <>
      {selectedMovies.map((movie, index) => (
        <MyListMovie movie={movie} key={index} />
      ))}
    </>
  );
}

function MyListMovie({ movie }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
            alt={movie.title}
            className="img-fluid rounded-start"
            style={{ height: "110px", width: "100%" }}
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{movie.Title}</h6>
            <div className="d-flex">
              <p>
                <i className="bi bi-star text-warning me-1"></i>
                <span className="fs-6">{movie.rating}</span>
              </p>
              <p className="ms-2">
                <i className="bi bi-stopwatch text-danger me-1"></i>
                <span className="fs-6">{movie.duration} dk</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="col-4">
      <span className="fs-3">🍿</span>
      <span className="fs-5">Movie App</span>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <div className="col-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control"
        placeholder="Film ara..."
      />
    </div>
  );
}

function NavSearchResults({ movies }) {
  return (
    <div className="col-4 text-end">
      <strong>{movies.length}</strong> Kayıt bulundu.
    </div>
  );
}
