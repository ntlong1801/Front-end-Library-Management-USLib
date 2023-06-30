import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './StudentHome.module.scss';
import classNames from 'classnames/bind';
import { requestCreateCard } from '@/service/studentService';
import Button from '@/components/Button';

const cx = classNames.bind(styles);


const RequestCreateCard = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState({
        student_id: '',
        fullName: '',
        email: '',
        address: '',
        birthday: '',
        typeOfReader: 'DocGiaX',
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

    const [selectedField, setSelectedField] = useState('');

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
        setFormData({
            ...formData,
            typeOfReader: e.target.value
        });
    };

    const handleRequest = async (e) => {
        e.preventDefault();
        // // Xử lý logic khi submit form
        const result = await requestCreateCard(formData);
        console.log(result);

        if (result.result === false) {
            setIsError(true);
            setMessage(result.nmsg)
        }
        setMessage(result.msg)
        // Reset form data
        setFormData({
            student_id: '',
            fullName: '',
            email: '',
            address: '',
            birthday: '',
            typeOfReader: 'DocGiaX',
        });
    };

    return (
        <div>
            <Button onClick={openModal}>Yêu cầu lập thẻ độc giả</Button>

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
                        <form onSubmit={handleRequest}>

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
                                    name="fullName"
                                    value={formData.fullName}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <label>
                                email:
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <label>
                                Địa chỉ:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <label>
                                Ngày sinh (dd/mm/yyyy):
                                <input
                                    type="text"
                                    name="birthday"
                                    value={formData.birthday}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => setMessage()}
                                />
                            </label>
                            <div>
                                <label>Loại độc giả:</label>
                                <select value={selectedField} onChange={handleFieldChange} onFocus={() => {
                                    setMessage('');
                                }}>
                                    <option value="DocGiaX" selected>Doc Gia X</option>
                                    <option value="DocGiaY">Doc Gia Y</option>
                                </select>
                            </div>
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

export default RequestCreateCard;