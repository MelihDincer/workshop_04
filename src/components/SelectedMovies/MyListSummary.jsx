import { getAverage } from "../../Helpers";

export default function MyListSummary({ selectedMovies }) {
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
