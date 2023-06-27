import React, { useState } from 'react';
import styles from './ReaderManagement.module.scss';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import { deleteReader } from '@/service/mainService';
import UpdateReaderModal from './updateReaderModal';

const cx = classNames.bind(styles);

const TableWithPagination = ({ data, itemsPerPage, onSignal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('')

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

  const handleDel = (id) => {
    // Hiển thị modal xác nhận khi nhấp vào nút xóa
    setId(id)
    setShowModal(true);
  };

  const handleConfirmDel = async (id) => {
    // Thực hiện xóa dữ liệu tương ứng với itemId ở đây
    console.log(id);

    await deleteReader(id);

    // Tắt modal
    setShowModal(false);
    onSignal("fetchData")
  };


  const handleCancelDel = () => {
    // Tắt modal
    setShowModal(false);
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
              <td className={cx('table-button')}><div>
                <UpdateReaderModal onSignal={handleOnSignalFromUpdate} id={item.id} />
              </div></td>
              <td className={cx('table-button')}> <button onClick={() => handleDel(item.id)}>Xóa</button></td>
            </tr>
          ))}

          <Modal
            isOpen={showModal}
            className={cx('modal-container')}
            contentLabel="Modal"
          >
            <div className={cx('modal-content')}>
              <div className={cx('modal-header', 'mb-8')}>
                <h2 className={cx('modal-title')}>Bạn có chắc muốn xóa người này không</h2>
              </div>
              <div className={cx('modal-body')}>
                <button onClick={() => handleConfirmDel(id)} className={cx('font-20')}>Có</button>
                <button onClick={handleCancelDel} className={cx('font-20')}>Không</button>
              </div>
            </div>
          </Modal >

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