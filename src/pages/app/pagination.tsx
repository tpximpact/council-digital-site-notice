import ReactPaginate from 'react-paginate';
import { NextIcon, PreviewIcon } from '../../../public/assets/icons';


const Pagination = ({data, onSelectPage, itemsPerPage}: any) => {

const pageCount = Math.ceil(data?.length / itemsPerPage);

const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    const newId = data[newOffset]
    onSelectPage(newId)
  };

return(
    <div className="wrap-pagination">
        <ReactPaginate
        breakLabel="..."
        nextLabel={<NextIcon/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<PreviewIcon/>}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination govuk-body"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

    </div>
)
}

export default Pagination;