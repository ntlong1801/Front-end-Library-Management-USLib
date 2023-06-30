import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';

import { viewBorrowedBook } from "@/service/studentService";
import styles from './StudentHistory.module.scss';

const cx = classNames.bind(styles);

const StudentHistory = () => {
    const [borrowedBook, setBorrowedBook] = useState([]);
    const itemsPerPage = 10; // Số dòng trong mỗi trang

    async function fetchData() {
        const data = await viewBorrowedBook('20120555');
        if (data.result === true) {
            setBorrowedBook(data.History);
        }
    }
    useEffect(() => {
        fetchData();

    }, []);

    return (
        <div>
            <div className={cx('table-container')}>
                <div>
                    <TableWithPagination data={borrowedBook} itemsPerPage={itemsPerPage} />
                </div>
            </div>
        </div>



    );
};

export default StudentHistory;
