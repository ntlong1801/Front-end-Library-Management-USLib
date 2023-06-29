import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './StudentHome.module.scss';
import classNames from 'classnames/bind';
import { reserveBook } from '@/service/studentService'

const cx = classNames.bind(styles);


const ModalBox = (data) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState({
        student_id: '',
        name: '',
        bookTitle: data.book.name,
        receive_date: ''
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleReserveBook = async (e) => {
        e.preventDefault();
        // // Xử lý logic khi submit form
        const newData = formData;
        newData.book_id = data.book.id;
        const result = await reserveBook(newData);
        if (result.result === false) {
            setIsError(true);
            setMessage(result.nmsg)
        }
        setMessage(result.msg)
        // Reset form data
        setFormData({
            student_id: '',
            name: '',
            bookTitle: '',
            receive_date: ''
        });
    };

    return (
        <div>
            <button onClick={openModal}>Đặt trước</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={cx('modal-container')}
                contentLabel="Modal"
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-title')}>Điền thông tin</h2>
                        <button onClick={closeModal} className={cx('close-modal')}>X</button>
                    </div>
                    <div className={cx('modal-body')}>
                        <form onSubmit={handleReserveBook}>

                            <label>
                                Mã số sinh viên:
                                <input
                                    type="text"
                                    name="student_id"
                                    value={formData.student_id}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <label>
                                Tên học sinh:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <label>
                                Tên sách:
                                <input
                                    type="text"
                                    name="bookTitle"
                                    value={data.book.name}
                                    disabled
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <label>
                                Ngày nhận sách (dd/mm/yyyy):
                                <input
                                    type="text"
                                    name="receive_date"
                                    value={formData.receive_date}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <p className={cx('message', { error: isError })}>{message}</p>
                            <div className={cx('center')}>
                                <button type="submit" className={cx('reserve-button')}>Đặt trước</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal >
        </div >
    );
};

export default ModalBox;