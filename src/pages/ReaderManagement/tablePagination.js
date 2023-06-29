import React, { useState } from 'react';
import styles from './ReaderManagement.module.scss';
// import Modal from 'react-modal';
import classNames from 'classnames/bind';
import { deleteReader } from '@/service/readerService';
import UpdateReaderModal from './updateReaderModal';

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
      await deleteReader(id);
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
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Ngày lập thẻ</th>
            <th>Loại độc giả</th>
            <th className={cx('table-button')}></th>
            <th className={cx('table-button')}></th>
          </tr>
        </thead>
        <tbody>
          {getDataForCurrentPage().map((item, index) => (
            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
              <td>{item.fullName}</td>
              <td>{item.birthday}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td>{item.dateCreated}</td>
              <td>{item.typeOfReader}</td>
              <td className={cx('table-button')}>
                <UpdateReaderModal onSignal={handleOnSignalFromUpdate} id={item.id} />
              </td>
              <td className={cx('table-button')}> <button onClick={() => handleDel(item.fullName, item.id)}>Xóa</button></td>
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