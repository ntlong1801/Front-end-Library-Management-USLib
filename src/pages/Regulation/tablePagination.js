import React, { useState } from 'react';
import styles from './Regulation.module.scss';
// import Modal from 'react-modal';
import classNames from 'classnames/bind';
import { deleteRegulation } from '@/service/regulationService';
import UpdateRegulationModal from './updateRegulationModal';

const cx = classNames.bind(styles);

const TableWithPagination = ({ data, searchResults, name, itemsPerPage, onSignal }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang dựa trên số lượng dữ liệu và số lượng dữ liệu trên mỗi trang
  let totalPages = Math.ceil(data.length / itemsPerPage);
  if (name !== '') {
    totalPages = Math.ceil(searchResults.length / itemsPerPage)
  }


  // Lấy dữ liệu cho trang hiện tại
  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (name !== '')
      return searchResults.slice(startIndex, endIndex);
    return data.slice(startIndex, endIndex);
  };

  // Chuyển đến trang trước
  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  // Chuyển đến trang tiếp theo
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleDel = async (name, id) => {
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm(`Bạn chắc chắn muốn xóa ${name}`);

    if (isDelete) {
      await deleteRegulation(id);
      onSignal(id)
    }
  };


  const handleOnSignalFromUpdate = () => {
    onSignal("fetchData")
  }

  return (
    <div>

      <table className={cx('full-width-table')}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá trị mặc định</th>
            <th>Giá trị hiện tại</th>
            <th className={cx('table-button')}></th>
            <th className={cx('table-button')}></th>
          </tr>
        </thead>
        <tbody>
          {getDataForCurrentPage().map((item, index) => (
            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
              <td>{item.name}</td>
              <td>{item.default_value}</td>
              <td>{item.current_value}</td>
              <td className={cx('table-button')}><div>
                <UpdateRegulationModal onSignal={handleOnSignalFromUpdate} data={item} />
              </div></td>
              <td className={cx('table-button')}> <button onClick={() => handleDel(item.name, item.id)}>Xóa</button></td>
            </tr>
          ))}

        </tbody>
      </table >


      {/* Hiển thị phân trang */}
      < div className={cx('pagination')} >
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div >

  );
};

export default TableWithPagination;