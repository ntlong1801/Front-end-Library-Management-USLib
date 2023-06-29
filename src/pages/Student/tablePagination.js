import React, { useState } from 'react';
import styles from './StudentHome.module.scss';
import classNames from 'classnames/bind';
import ModalBox from './reserveBookModal'

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
            <th>Tên</th>
            <th>Thể loại</th>
            <th>Tác giả</th>
            <th>Hình ảnh</th>
            <th>Năm xuất bản</th>
            <th>Nhà xuất bản</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getDataForCurrentPage().map((item, index) => (
            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
              <td>{item.name}</td>
              <td>{item.genre}</td>
              <td>{item.author}</td>
              <td><img src={item.photos[0]} alt={item.name} /></td>
              <td>{item.published_year}</td>
              <td>{item.publisher}</td>
              <td>{item.status}</td>
              <td> {item.status === 'Có sẵn' && (
                <ModalBox book={item} />
              )}</td>
            </tr>
          ))}

        </tbody>
      </table>


      {/* Hiển thị phân trang */}
      <div className={cx('pagination')}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default TableWithPagination;