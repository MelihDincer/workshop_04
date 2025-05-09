import { useEffect, useState } from "react";
const api_key = "8026a27df6698ce2cd7ba34fbb8bf5f8";

export default function useMovieDetails(id) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [id]
  );
  return { movie, loading };
}
