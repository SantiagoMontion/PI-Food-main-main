import { Link } from "react-router-dom";
import  "../styles/Pagination.css";


function Pagination({quantityXPage,handlePagination,currentPage,pages}) {
  

  let pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="pagination">
      {pageNumbers.length !== 0 && (
        <ul>
          <li >
            <button
              className="PagButton" 
              onClick={() => {
                if (currentPage > 1) return handlePagination(currentPage - 1);
              }}
            >
              {"<< "}
            </button>
          </li>
          {pageNumbers?.map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <button
                  className={`PagButton ${currentPage === pageNumber ? "active" : ""}`}
                  onClick={() => {
                    return handlePagination(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
          <li >
            <button
              className="PagButton"
              onClick={() => {
                if (currentPage < pageNumbers.length)
                  return handlePagination(currentPage + 1);
              }}
            >
              {">>"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Pagination;

export const objIndexPagination = (pageNumber, quantityXPage) => {
  const lastItemIndex = pageNumber * quantityXPage;
  const firstItemIndex = lastItemIndex - quantityXPage;
  return { lastItemIndex, firstItemIndex };
};