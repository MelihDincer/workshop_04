export default function Pagination({
  nextPage,
  previousPage,
  currentPage,
  totalPages,
}) {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <a className="page-link " href="#" onClick={previousPage}>
            Previous
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <a className="page-link" href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
