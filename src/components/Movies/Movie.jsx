export default function Movie({ movie, onSelectMovie, selectedMovieId }) {
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
