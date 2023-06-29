import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';

import { getAllBook } from "@/service/studentService";
import styles from './StudentHome.module.scss';



const cx = classNames.bind(styles);

const StudentPage = () => {
    const [dataList, setDataList] = useState([]);
    const itemsPerPage = 2; // Số dòng trong mỗi trang

    async function fetchBook() {
        const data = await getAllBook();
        setDataList(data.books);
    }
    useEffect(() => {
        fetchBook();

    }, []);

    return (

        <div className={cx('table-container')}>
            <div>
                <TableWithPagination data={dataList} itemsPerPage={itemsPerPage} />
            </div>
        </div>

    );
};

export default StudentPage;
