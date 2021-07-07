import Pagination from "react-js-pagination"
import './style.scss'

const ListPagination = ({count, limit, offset, activeItem, handleClick, handleChangeLimit}) => {

  return <div className='pagination__container'>
    <Pagination
      linkClass="custom-link"
      activePage={activeItem}
      itemsCountPerPage={limit}
      totalItemsCount={count}
      pageRangeDisplayed={offset}
      onChange={handleClick}
    />
    <select onChange={handleChangeLimit} defaultValue={limit}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={20}>20</option>
    </select>
  </div>
}

export default ListPagination