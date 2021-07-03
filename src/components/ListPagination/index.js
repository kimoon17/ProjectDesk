import Pagination from "react-js-pagination"
import './style.scss'

const ListPagination = ({items, limit, offset, activeItem, handleClick}) => {

  return <div className='pagination__container'>
    <Pagination
      activePage={activeItem}
      itemsCountPerPage={limit}
      totalItemsCount={items.length}
      pageRangeDisplayed={offset}
      onChange={handleClick}
    />
  </div>
}

export default ListPagination