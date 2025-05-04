import MyListMovie from "./MyListMovie";

export default function MyMovieList({ selectedMovies, onDeleteFromMovieList }) {
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
