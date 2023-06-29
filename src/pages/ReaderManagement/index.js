import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';
import images from "@/assets/images";
import { getAllReader } from "@/service/readerService";
import styles from './ReaderManagement.module.scss';
import AddReaderModal from "./addReaderModal";



const cx = classNames.bind(styles);

const ReaderManagement = () => {
    const [dataList, setDataList] = useState([]);
    const [name, setName] = useState('')
    const [searchResults, setSearchResults] = useState([]);
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
        if (signal === 'fetchData') {
            fetchReader();
        }
        else {
            setDataList((prev) => {
                return prev.filter((reader) => {
					return reader.id !== signal;
				});
            })
        }
    };

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
                        <input type="text" placeholder="Tìm kiếm độc giả theo tên" onChange= {(e)=> {
                            filterResults(e.target.value)
                            setName (e.target.value)}} />
                        <button type="submit" onClick={handleSearch}>
                            <img src={images.search} alt="searchBox" />
                        </button>
                    </div>
                </div>
                <div className={cx('table-container')}>
                    <div>
                        <TableWithPagination data={dataList} searchResults={searchResults} name={name}
                         itemsPerPage={itemsPerPage} onSignal={handleSignalFromModal} />

                    </div>
                </div>
            </div>



        </div>




    );
};

export default ReaderManagement;
