import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';
import { getAllRegulation } from "@/service/regulationService";
import styles from './Regulation.module.scss';
import AddRegulationModal from "./addRegulationModal";



const cx = classNames.bind(styles);

const ReaderManagement = () => {
    const [dataList, setDataList] = useState([]);
    const itemsPerPage = 10; // Số dòng trong mỗi trang

    async function fetchRegulation () {
        const data = await getAllRegulation();
        setDataList(data.regulations);
    }
    useEffect(() => {
        fetchRegulation();

    }, []);

    const handleSignalFromModal = (signal) => {
        if (signal === 'fetchData') {
            fetchRegulation();
        }
        else {
            setDataList((prev) => {
                return prev.filter((reader) => {
                    return reader.id !== signal;
                });
            })
        }
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-container')}>
                <div className={cx('add-search-container')}>
                    <div className={cx('add-btn')}>
                        <AddRegulationModal onSignal={handleSignalFromModal} />
                    </div>
                </div>
                <div className={cx('table-container')}>
                    <div>
                        <TableWithPagination data={dataList}
                            itemsPerPage={itemsPerPage} onSignal={handleSignalFromModal} />

                    </div>
                </div>
            </div>

        </div>




    );
};

export default ReaderManagement;
