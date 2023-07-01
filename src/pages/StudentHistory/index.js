import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';

import { viewBorrowedBook } from "@/service/studentService";
import styles from './StudentHistory.module.scss';
import useGlobalContext from "@/hooks/useGlobalContext";

const cx = classNames.bind(styles);

const StudentHistory = () => {
    const [borrowedBook, setBorrowedBook] = useState([]);
    const itemsPerPage = 10; // Số dòng trong mỗi trang
    const [state] = useGlobalContext()

    async function fetchData () {
        const data = await viewBorrowedBook(state.id);
        if (data.result === true) {
            setBorrowedBook(data.History);
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
