import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Regulation.module.scss';
import classNames from 'classnames/bind';
import { addRegulation } from '@/service/regulationService'

const cx = classNames.bind(styles);


const AddRegulationModal = ({ onSignal }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        default_value: '',
        current_value: '',
    });
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('');

    const openModal = () => {
        setIsError(false)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setFormData({
            name: '',
            default_value: '',
            current_value: '',
        });
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddReader = async (e) => {
        e.preventDefault();
        setMessage("Vui lòng đợi...")

        const result = await addRegulation(formData);
        if (result.result === false || result.error !== undefined) {
            setIsError(true)
            setMessage(result.msg || result.error)
        }
        else {
            setIsError(false)
            // Reset form data
            setFormData({
                name: '',
                default_value: '',
                current_value: '',
            });
            setMessage(result.msg)
            onSignal("fetchData")
        }


    };

    return (
        <div>
            <button onClick={openModal} className={cx('add-regulation-button')}>
                Thêm quy định
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={cx('modal-container')}
                contentLabel="Modal"
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header', 'mb-8')}>
                        <h2 className={cx('modal-title')}>Điền thông tin</h2>
                        <button onClick={closeModal} className={cx('close-modal')}>X</button>
                    </div>
                    <div className={cx('modal-body')}>
                        <form onSubmit={handleAddReader}>

                            <label>
                                Tên quy định:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder='Nhập tên quy định'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>
                            <label>
                                Giá trị mặc định:
                                <input
                                    type="text"
                                    name="default_value"
                                    value={formData.default_value}
                                    placeholder='Nhập giá trị mặc định'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>
                            <label>
                                Giá trị hiện tại:
                                <input
                                    type="text"
                                    name="current_value"
                                    value={formData.current_value}
                                    placeholder='Nhập giá tị hiện tại'
                                    required
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        setMessage('');
                                    }}
                                />
                            </label>

                            <p className={cx('message', { error: isError })}>{message}</p>
                            <div className={cx('center')}>
                                <button type="submit" className={cx('add-regulation-button')}>Thêm quy định</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal >
        </div >
    );
};

export default AddRegulationModal;