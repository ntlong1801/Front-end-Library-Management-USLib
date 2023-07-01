import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';

import styles from './Reader.module.scss';
import images from "@/assets/images";
import TableWithPagination from './tablePagination';
import AddReaderModal from "./addReaderModal";
import { getAllReader, viewRequest } from "@/service/readerService";

const cx = classNames.bind(styles);

const ReaderManagement = () => {
    const [dataList, setDataList] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [name, setName] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const itemsPerPage = 5; // Số dòng trong mỗi trang

    async function fetchReader () {
        const data = await getAllReader();
        setDataList(data.readers);
    }

    async function fetchRequest () {
        const request = await viewRequest();
        if (request.result === true) {
            setRequestList(request.request)
        }
        else {
            setRequestList([])
        }
    }
    useEffect(() => {
        fetchReader();
        fetchRequest();
    }, []);

    const handleSignalFromModal = (signal) => {
        if (signal === 'fetchData') {
            fetchReader();
        }
        else if (signal === 'fetchDataRequest') {
            fetchRequest()
        }
        else {
            setDataList((prev) => {
                return prev.filter((reader) => {
                    return reader.id !== signal;
                });
            });
        }
    }


    const handleSearch = () => {
        setDataList((prev) => {
            return prev.filter((reader) => {
                const fullName = reader.fullName;
                return fullName.toLowerCase().includes(name.toLowerCase());
            })
        })
    }

    const filterResults = (name) => {
        const results = dataList.filter((reader) =>
            reader.fullName.toLowerCase().includes(name.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-container')}>
                <div className={cx('add-search-container')}>
                    <div className={cx('add-btn')}>
                        <AddReaderModal onSignal={handleSignalFromModal} />
                    </div>
                    <div className={cx('search-box')}>
                        <input type="text" placeholder="Tìm kiếm độc giả theo tên" onChange={(e) => {
                            filterResults(e.target.value)
                            setName(e.target.value)
                        }} />

                        <button type="submit" onClick={handleSearch}>
                            <img src={images.search} alt="searchBox" />
                        </button>
                    </div>
                </div>
                <div className={cx('table-container')}>
                    <div>
                        <TableWithPagination data={dataList} searchResults={searchResults} name={name}
                            itemsPerPage={itemsPerPage} onSignal={handleSignalFromModal} type={true} />
                    </div>
                </div>
                <br />
                <div className={cx('table-container')}>
                    <h2 >Yêu cầu lập thẻ độc giả: </h2>
                    <div>
                        <TableWithPagination data={requestList} searchResults={searchResults} name={name}
                            itemsPerPage={itemsPerPage} onSignal={handleSignalFromModal} type={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderManagement;