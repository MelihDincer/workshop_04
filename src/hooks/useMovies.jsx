import { useEffect, useState } from "react";

export default function useMovies(query) {
  const api_key = "8026a27df6698ce2cd7ba34fbb8bf5f8";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total_results, setTotal_Results] = useState(0);
  const [error, setError] = useState("");

  function nextPage() {
    console.log(currentPage + 1);
    setCurrentPage(currentPage + 1);
  }

  function previousPage() {
    console.log(currentPage - 1);
    setCurrentPage(currentPage - 1);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovies(pageNo) {
        try {
          setLoading(true);
          setError("");
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${pageNo}`,
            { signal: signal }
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
          setTotalPages(data.total_pages);
          setTotal_Results(data.total_results);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted...");
          } else {
            setError(error.message);
          }
        }
        setLoading(false);
      }

      if (query.length < 4) {
        setMovies([]);
        setError("");
        return;
      }
      getMovies(currentPage);
      return () => {
        controller.abort();
      };
      // fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setMovies(data.results), setselectedMovies(data.results);
      //   });
    },
    [query, currentPage]
  );

  return { movies, loading, error };
}
