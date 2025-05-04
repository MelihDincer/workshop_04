export default function MyListMovie({ movie, onDeleteFromMovieList }) {
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
