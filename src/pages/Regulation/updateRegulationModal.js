import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Regulation.module.scss';
import classNames from 'classnames/bind';
import { updateOneRegulation } from '@/service/regulationService'
import Button from '@/components/Button';

const cx = classNames.bind(styles);


const UpdateRegulationModal = ({ onSignal, data }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: data.name,
        default_value: data.default_value,
        current_value: data.current_value,
    });
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('');

    const openModal = async () => {
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


    const handleUpdateReader = async (e) => {
        e.preventDefault();
        setMessage("Vui lòng đợi...")

        const result = await updateOneRegulation(data.id, formData);
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
            <Button onClick={() => openModal()} >
                Sửa
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
                                <button type="submit" className={cx('add-regulation-button')}>Sửa quy định</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal >
        </div >
    );
};

export default UpdateRegulationModal;