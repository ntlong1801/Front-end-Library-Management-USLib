import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Reader.module.scss';
import classNames from 'classnames/bind';
import { getOneReader, updateOneReader } from '@/service/readerService'
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


const UpdateReaderModal = ({ onSignal, id }) => {
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

    const openModal = async (id) => {
        const data = await getOneReader(id);
        setFormData({
            student_id: id,
            fullName: data.reader.fullName,
            email: data.reader.email,
            address: data.reader.address,
            birthday: data.reader.birthday,
            typeOfReader: data.reader.typeOfReader,
            dateCreated: data.reader.dateCreated,
        });
        setIsError(false)
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

    const handleUpdateReader = async (e) => {
        e.preventDefault();
        setMessage("Vui lòng đợi...")

        const newData = formData;
        delete newData.student_id;

        const result = await updateOneReader(id, newData);
        console.log(result);
        if (result.result === false || result.error !== undefined) {
            setIsError(true)
            setMessage(result.msg || result.error)
        }
        else {
            setIsError(false)
            // Reset form data
            setMessage(result.msg)
            onSignal("fetchData")
        }


    };

    return (
        <div>
            <Button isIcon onClick={() => openModal(id)} >
                <FontAwesomeIcon icon={faPen} />
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
                        <form onSubmit={handleUpdateReader}>

                            <label>
                                Mã số sinh viên:
                                <input
                                    type="text"
                                    name="student_id"
                                    value={formData.student_id}
                                    placeholder='Nhập mã số sinh viên'
                                    required
                                    disabled
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
                                <button type="submit" className={cx('add-reader-button')}>Sửa độc giả</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal >
        </div >
    );
};

export default UpdateReaderModal;