import React, { useState } from 'react';
import styles from './StudentHistory.module.scss';
import classNames from 'classnames/bind';
import ModalBox from './renewalBookModal'
import Button from '@/components/Button';

const cx = classNames.bind(styles);

const TableWithPagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang dựa trên số lượng dữ liệu và số lượng dữ liệu trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
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

  return (
    <div className={cx('m-16')}>
      <table className={cx('full-width-table')}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getDataForCurrentPage().map((item, index) => (
            <tr key={index}>
              <td>{item.book_id}</td>
              <td>{item.borrow_date}</td>
              <td>{item.return_date}</td>
              <td>{item.is_return ? 'Đã trả' : 'Đang mượn'}</td>
              <td> {item.is_return === false && (
                <ModalBox book={item} />
              )}</td>
            </tr>
          ))}

        </tbody>
      </table>


      {/* Hiển thị phân trang */}
      <div className={cx('pagination')}>
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</Button>
        <span className={cx('p-8')}>{currentPage} / {totalPages}</span>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  );
};

export default TableWithPagination;