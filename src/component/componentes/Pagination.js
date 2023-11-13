import React from 'react';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const maxDisplayedPages = 3; // Número máximo de páginas que se mostrarán.
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
  
    const generatePageNumbers = () => {
      const pages = [];
  
      if (totalPages <= maxDisplayedPages) {
        // Si el número total de páginas es menor o igual al límite, muestra todas las páginas.
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Si hay más páginas que el límite, calcula cuántas páginas mostrar antes y después de la página actual.
        const pagesBeforeCurrent = Math.floor(maxDisplayedPages / 2);
        const pagesAfterCurrent = maxDisplayedPages - pagesBeforeCurrent;
  
        let startPage = currentPage - pagesBeforeCurrent;
        let endPage = currentPage + pagesAfterCurrent;
  
        if (startPage < 1) {
          startPage = 1;
          endPage = maxDisplayedPages;
        }
  
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxDisplayedPages + 1;
        }
  
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
  
      return pages;
      };

  return (
    <div className='container'>
        <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
            <a href='#img_pkx'
              className="page-link"
              onClick={() => handlePageChange(1)}
              disabled={isFirstPage}
            >
              1...
            </a>
          </li>
            <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
            <a href='#img_pkx'
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
            >
                Previous
            </a>
            </li>
            {generatePageNumbers().map((page) => (
            <li
                key={page}
                className={`page-item ${currentPage === page ? 'active' : ''}`}
            >
                <a href='#img_pkx' className="page-link" onClick={() => handlePageChange(page)}>
                {page}
                </a>
            </li>
            ))}
            <li className={`page-item ${isLastPage} ? 'disabled' : '' `}>
            <a href='#img_pkx'
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
            >
                Next
            </a>
            </li>

          {/* Botón para ir a la última página */}
          <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
            <a href='#img_pkx'
              className="page-link"
              onClick={() => handlePageChange(totalPages)}
              disabled={isLastPage}
            >
              ...{totalPages}
            </a>
          </li>
        </ul>
        </nav>
    </div>

  );
}

export default Pagination;