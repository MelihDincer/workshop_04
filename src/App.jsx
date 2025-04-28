import { useEffect, useState } from "react";
import StarRating from "./StarRating";

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
  const [selectedMovies, setselectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setselectedMovieId] = useState(null);

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
      //     setMovies(data.results), setselectedMovies(data.results);
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
                  onSelectMovie={handleselectedMovieId}
                  selectedMovieId={selectedMovieId}
                />
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

function MovieList({ movies, onSelectMovie, selectedMovieId }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie, index) => (
        <Movie
          movie={movie}
          onSelectMovie={onSelectMovie}
          selectedMovieId={selectedMovieId}
          key={index}
        />
      ))}
    </div>
  );
}

function MovieDetails({
  selectedMovieId,
  onUnSelectMovie,
  onAddToMovieList,
  selectedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const selectedMovieUserRating = selectedMovies.find(
    (m) => m.id === selectedMovieId
  )?.userRating;

  const isAddedToList = selectedMovies
    .map((m) => m.id)
    .includes(selectedMovieId);

  function handleAddToList() {
    const newMovie = {
      ...movie,
      userRating,
    };
    onAddToMovieList(newMovie);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}?api_key=${api_key}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [selectedMovieId]
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-2 mb-3">
          <div className="row">
            <div className="col-4">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500` + movie.poster_path
                    : "/img/noimage.png"
                }
                alt={movie.title}
                className="img-fluid rounded"
                style={{ height: "130px", width: "100%" }}
              />
            </div>
            <div className="col-8">
              <h6>{movie.title}</h6>
              <p>
                <i className="bi bi-calendar2-date me-1"></i>
                <span>{movie.release_date}</span>
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </p>
            </div>
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.overview}</p>
              <p>
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge text-bg-primary me-1">
                    {genre.name}
                  </span>
                ))}
              </p>
              {!isAddedToList ? (
                <>
                  <div className="my-3">
                    <StarRating
                      maxRating={10}
                      size={18}
                      onRating={setUserRating}
                    />
                  </div>
                  <button
                    className="btn btn-primary me-1"
                    onClick={() => handleAddToList(movie)}
                  >
                    Listeye Ekle
                  </button>
                </>
              ) : (
                <p>
                  Film listenizde. <br /> Değerlendirme:
                  <i className="bi bi-stars text-primary me-1"></i>
                  {selectedMovieUserRating}
                </p>
              )}

              <button className="btn btn-danger" onClick={onUnSelectMovie}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Movie({ movie, onSelectMovie, selectedMovieId }) {
  return (
    <div className="col mb-2">
      <div
        className={`card movie ${
          selectedMovieId == movie.id ? "selected-movie" : ""
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
  const avgRating = getAverage(
    selectedMovies.map((movie) => movie.vote_average)
  );
  const avgDuration = getAverage(selectedMovies.map((movie) => movie.runtime));
  const avgUserRating = getAverage(
    selectedMovies.map((movie) => movie.userRating)
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
            <p>
              <i className="bi bi-stars text-warning me-1"></i>
              <span className="fs-6">{avgUserRating.toFixed(0)}</span>
            </p>
            <p className="ms-3">
              <i className="bi bi-stopwatch-fill text-danger me-1"></i>
              <span className="fs-6">{avgDuration.toFixed(0)} dk</span>
            </p>
          </div>
        </h5>
      </div>
    </div>
  );
}

function MyMovieList({ selectedMovies, onDeleteFromMovieList }) {
  return (
    <>
      {selectedMovies.map((movie) => (
        <MyListMovie
          movie={movie}
          onDeleteFromMovieList={onDeleteFromMovieList}
          key={movie.id}
        />
      ))}
    </>
  );
}

function MyListMovie({ movie, onDeleteFromMovieList }) {
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
            <h6 className="card-title">{movie.title}</h6>
            <div className="d-flex">
              <p>
                <i className="bi bi-star text-warning me-1"></i>
                <span className="fs-6">{movie.vote_average}</span>
              </p>
              <p className="ms-2">
                <i className="bi bi-stopwatch text-danger me-1"></i>
                <span className="fs-6">{movie.runtime} dk</span>
              </p>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleteFromMovieList(movie.id)}
            >
              Sil
            </button>
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
