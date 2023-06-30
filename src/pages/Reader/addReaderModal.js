import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Reader.module.scss';
import classNames from 'classnames/bind';
import { addReader } from '@/service/readerService'
import Button from '@/components/Button';

const cx = classNames.bind(styles);


const AddReaderModal = ({ onSignal }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        student_id: '',
        fullName: '',
        email: '',
        address: '',
        birthday: '',
        typeOfReader: 'DocGiaX',
        dateCreated: '',
    });
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('');

    const openModal = () => {
        setIsError(false)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setFormData({
            student_id: '',
            fullName: '',
            email: '',
            address: '',
            birthday: '',
            typeOfReader: 'DocGiaX',
            dateCreated: '',
        });
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

    const handleAddReader = async (e) => {
        e.preventDefault();
        setMessage("Vui lòng đợi...")

        const result = await addReader(formData);
        if (result.result === false || result.error !== undefined) {
            setIsError(true)
            setMessage(result.msg || result.error)
        }
        else {
            setIsError(false)
            // Reset form data
            setFormData({
                student_id: '',
                fullName: '',
                email: '',
                address: '',
                birthday: '',
                typeOfReader: 'DocGiaX',
                dateCreated: '',
            });
            setSelectedField('DocGiaX');
            setMessage(result.msg)
            onSignal("fetchData")
        }


    };

    return (
        <div>
            <Button onClick={openModal} >
                Thêm độc giả
            </Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={cx('modal-container')}
                contentLabel="Modal"
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header', 'mb-8')}>
                        <h2 className={cx('modal-title')}>Điền thông tin</h2>
                        <Button onClick={closeModal} >X</Button>
                    </div>
                    <div className={cx('modal-body')}>
                        <form onSubmit={handleAddReader}>

                            <label>
                                Mã số sinh viên:
                                <input
                                    type="text"
                                    name="student_id"
                                    value={formData.student_id}
                                    placeholder='Nhập mã số sinh viên'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>
                            <label>
                                Họ và tên:
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    placeholder='Nhập họ tên'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder='Nhập email'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>
                            <label>
                                Địa chỉ:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    placeholder='Nhập địa chỉ'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
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
                                    onFocus={() => {
                                        setMessage('');
                                    }}
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
                            <label>
                                Ngày lập thẻ (dd/mm/yyyy):
                                <input
                                    type="text"
                                    name="dateCreated"
                                    value={formData.dateCreated}
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>
                            <p className={cx('message', { error: isError })}>{message}</p>
                            <div className={cx('center')}>
                                <button type="submit" className={cx('add-reader-button')}>Thêm độc giả</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal >
        </div >
    );
};

export default AddReaderModal;