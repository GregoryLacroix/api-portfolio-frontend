import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

//   console.log(pageNumbers);

  return (
    <div className="notification">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="buttons has-addons">
              {pageNumbers.map((number) => (
                <button
                  type="button"
                  key={number}
                  className={`page-item button ${
                    currentPage === number ? "is-active" : ""
                  }`}
                  onClick={(e) => paginate(number, e)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <small>Page {currentPage} of {pageNumbers.length}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
