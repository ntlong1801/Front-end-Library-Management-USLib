import React, { useState } from 'react';
import styles from './Reader.module.scss';
// import Modal from 'react-modal';

import classNames from 'classnames/bind';
import { deleteReader, addReader, deleteRequest } from '@/service/readerService';
import UpdateReaderModal from './updateReaderModal';
import Button from '@/components/Button';
import Tippy from '@tippyjs/react/headless';
import Popper from '@/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleXmark, faListDots, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const TableWithPagination = ({ data, searchResults, name, itemsPerPage, onSignal, type }) => {
	const [currentPage, setCurrentPage] = useState(1);

	// Tính toán số trang dựa trên số lượng dữ liệu và số lượng dữ liệu trên mỗi trang
	let totalPages = Math.ceil(data.length / itemsPerPage);
	if (name !== '' && type) {
		totalPages = Math.ceil(searchResults.length / itemsPerPage)
	}


	// Lấy dữ liệu cho trang hiện tại
	const getDataForCurrentPage = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		if (name !== '' && type)
			return searchResults.slice(startIndex, endIndex);
		return data.slice(startIndex, endIndex);
	};

	// Chuyển đến trang trước
	const goToPreviousPage = () => {
		setCurrentPage(prevPage => prevPage - 1);
	};

	// Chuyển đến trang tiếp theo
	const goToNextPage = () => {
		setCurrentPage(prevPage => prevPage + 1);
	};

	const handleDel = async (name, id) => {
		// eslint-disable-next-line no-restricted-globals
		const isDelete = confirm(`Bạn chắc chắn muốn xóa ${name}`);

		if (isDelete) {
			await deleteReader(id);
			onSignal(id)
		}
	};

	function formatDate (date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	const handleAccept = async (item) => {
		// eslint-disable-next-line no-restricted-globals
		const isAccept = confirm(`Bạn chắc chắn muốn lập thẻ độc giả cho ${item.fullName}`);

		if (isAccept) {
			const data = item;
			const currentDate = new Date();
			const formattedDate = formatDate(currentDate);
			data.dateCreated = formattedDate;
			const result = await addReader(data);
			if (result.result === true) {
				deleteRequest(item.student_id)
				onSignal("fetchDataRequest")
			}
			else {
				alert(result.msg || result.error);
			}
		}
	}

	const handleDelRequest = async (student_id) => {
		// eslint-disable-next-line no-restricted-globals
		const isAccept = confirm(`Bạn chắc chắn muốn từ chối yêu cầu này?`);

		if (isAccept) {
			await deleteRequest(student_id);
			onSignal("fetchDataRequest")
		}
	}


	const handleOnSignalFromUpdate = () => {
		onSignal("fetchData")
	}

	return (
		<div>

			<table className={cx('full-width-table')}>
				<thead>
					<tr>
						<td width="20%">Họ và tên</td>
						<td>Ngày sinh</td>
						<td>Địa chỉ</td>
						<td width="20%">Email</td>
						{type && <td>Ngày lập thẻ</td>}
						<td>Loại độc giả</td>
						<td >Thao tác</td>
					</tr>
				</thead>
				<tbody>
					{getDataForCurrentPage().map((item, index) => (
						<tr key={item.student_id} >
							<td>{item.fullName}</td>
							<td>{item.birthday}</td>
							<td>{item.address}</td>
							<td>{item.email}</td>
							{type && <td>{item.dateCreated}</td>}
							<td>{item.typeOfReader}</td>
							{!type && (<td> <Button success onClick={() => handleAccept(item)}> <FontAwesomeIcon isIcon icon={faCheck} /> </Button>
								<Button warning onClick={() => handleDelRequest(item.student_id)}>
									<FontAwesomeIcon isIcon icon={faCircleXmark} />
								</Button>
							</td>)}

							{type && (<td >
								<Tippy
									interactive
									placement='top-start'
									render={attrs => <div {...attrs} className='box'
										tabIndex='-1'>
										<Popper className={cx('sub-menu')}>
											<UpdateReaderModal onSignal={handleOnSignalFromUpdate} id={item.id} />
											<Button isIcon onClick={() => handleDel(item.fullName, item.id)}>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</Popper>
									</div>}>
									<Button isIcon>
										<FontAwesomeIcon icon={faListDots} />
									</Button>
								</Tippy>
							</td>)}
						</tr>
					))}

				</tbody>
			</table >
			{/* Hiển thị phân trang */}
			< div className={cx('pagination')} >
				<Button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</Button>
				<span className={cx('p-8')}>{currentPage} / {totalPages}</span>
				<Button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</Button>
			</div>
		</div >

	);
};

export default TableWithPagination;