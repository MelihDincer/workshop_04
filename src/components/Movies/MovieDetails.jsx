import { useState } from "react";
import useMovieDetails from "../../hooks/useMovieDetails";
import Loading from "../Loading";
import StarRating from "../StarRating";

export default function MovieDetails({
  selectedMovieId,
  onUnSelectMovie,
  onAddToMovieList,
  selectedMovies,
}) {
  const [userRating, setUserRating] = useState(null);
  const { movie, loading } = useMovieDetails(selectedMovieId);

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
