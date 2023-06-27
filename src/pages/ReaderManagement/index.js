import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom'
import images from "@/assets/images";
import { getAllReader } from "@/service/mainService";
import styles from './ReaderManagement.module.scss';
import AddReaderModal from "./addReaderModal";



const cx = classNames.bind(styles);

const ReaderManagement = () => {
    const [dataList, setDataList] = useState([]);
    const itemsPerPage = 10; // Số dòng trong mỗi trang

    async function fetchReader() {
        const data = await getAllReader();
        console.log(data);
        setDataList(data.readers);
    }
    useEffect(() => {
        fetchReader();

    }, []);

    const handleSignalFromModal = (signal) => {
        if (signal == 'fetchData') {
            fetchReader();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-container')}>
                <div className={cx('add-search-container')}>
                    <div className={cx('add-btn')}>
                        <AddReaderModal onSignal={handleSignalFromModal} />
                    </div>
                    <div className={cx('search-box')}>
                        <input type="text" placeholder="Tìm kiếm độc giả theo tên" />
                        <button type="submit">
                            <img src={images.search} alt="searchBox" />
                        </button>
                    </div>
                </div>
                <div className={cx('table-container')}>
                    <div>
                        <TableWithPagination data={dataList} itemsPerPage={itemsPerPage} onSignal={handleSignalFromModal} />

                    </div>
                </div>
            </div>



        </div>




    );
};

export default ReaderManagement;
