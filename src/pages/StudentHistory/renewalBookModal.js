import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './StudentHistory.module.scss';
import classNames from 'classnames/bind';
import { renewalBorrowBook } from '@/service/studentService'
import Button from '@/components/Button';

const cx = classNames.bind(styles);


const ModalBox = (data) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState({
        book_id: data.book.book_id,
        date: data.book.borrow_date,
        day: '',
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

    const handleRenewBook = async (e) => {
        e.preventDefault();
        // // Xử lý logic khi submit form
        console.log(formData);
        const result = await renewalBorrowBook('20120555', formData);
        if (result.result === false) {
            setIsError(true);
            setMessage(result.nmsg)
        }
        setMessage(result.msg)
        // Reset form data
        setFormData({
            day: ''
        });
    };

    return (
        <div>
            <Button onClick={openModal}>Gia hạn</Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={cx('modal-container')}
                contentLabel="Modal"
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-title')}>Điền thông tin</h2>
                        <Button onClick={closeModal} >X</Button>
                    </div>
                    <div className={cx('modal-body')}>
                        <form onSubmit={handleRenewBook}>
                            <label>
                                Số ngày xin gia hạn thêm:
                                <input
                                    type="text"
                                    name="day"
                                    value={formData.day}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <p className={cx('message', { error: isError })}>{message}</p>
                            <div className={cx('center')}>
                                <button type="submit" className={cx('reserve-button')}>Gia hạn</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal >
        </div >
    );
};

export default ModalBox;