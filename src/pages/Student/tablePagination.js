import React, { useState } from 'react';
import styles from './StudentHome.module.scss';
import classNames from 'classnames/bind';
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
    <div className='mt-16'>
      <table className={cx('full-width-table')}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Thể loại</th>
            <th>Tác giả</th>
            <th>Hình ảnh</th>
            <th>Năm xuất bản</th>
            <th>Nhà xuất bản</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {getDataForCurrentPage().map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.genre}</td>
              <td>{item.author}</td>
              <td><img src={item.photos[0]} alt={item.name} /></td>
              <td>{item.published_year}</td>
              <td>{item.publisher}</td>
              <td>{item.status}</td>
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