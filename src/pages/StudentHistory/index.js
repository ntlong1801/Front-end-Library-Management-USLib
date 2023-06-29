import React, { useState, useEffect } from "react";
import TableWithPagination from './tablePagination';
import classNames from 'classnames/bind';

import { viewBorrowedBook, viewReserveBook } from "@/service/studentService";
import styles from './StudentHistory.module.scss';

const cx = classNames.bind(styles);

const StudentHistory = () => {
    const [borrowedBook, setBorrowedBook] = useState([]);
    const [reserveBook, setReserveBook] = useState([]);
    const itemsPerPage = 2; // Số dòng trong mỗi trang

    async function fetchData() {
        const data = await viewBorrowedBook('20120555');
        const data1 = await viewReserveBook('20120526');
        console.log(data1.reserveBook);
        if (data.result === true) {
            setBorrowedBook(data.History);
        }
        setReserveBook(data1.reserveBook)
    }
    useEffect(() => {
        fetchData();

    }, []);

    return (
        <div>
            <h2 className={cx('m-16')}>Danh sách sách mượn:</h2>
            <div className={cx('table-container')}>
                <div>
                    <TableWithPagination data={borrowedBook} itemsPerPage={itemsPerPage} />
                </div>
            </div>
            <br />
            <h2 className={cx('m-16')}>Danh sách sách đặt trước:</h2>
            <div className={cx('table-container')}>
                <table className={cx('full-width-table', 'm-16')}>
                    <thead>
                        <tr>
                            <th>Mã số sách:</th>
                            <th>Tên sách</th>
                            <th>Ngày nhận sách</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveBook.map((item, index) => (
                            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
                                <td>{item.book_id}</td>
                                <td>{item.name}</td>
                                <td>{item.receive_date}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>



    );
};

export default StudentHistory;
