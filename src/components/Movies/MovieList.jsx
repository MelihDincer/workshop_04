import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie, selectedMovieId }) {
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
