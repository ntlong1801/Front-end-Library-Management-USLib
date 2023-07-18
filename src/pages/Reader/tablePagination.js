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
import { ToastContainer, toast } from 'react-toastify';
import toastOption from '@/utils/toastOption';
import Modal from 'react-modal'
import customStyles from '@/utils/styleModal';

const cx = classNames.bind(styles);

const TableWithPagination = ({ data, searchResults, name, itemsPerPage, onSignal, type }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [modalIsOpen, setIsOpen] = useState(false);

	const [action, setAction] = useState({
		type: '',
		data: {}
	})

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
		await deleteReader(id);
		onSignal(id)
		toast.success('Xóa thành công', toastOption)
	};

	function formatDate (date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	const handleAccept = async (item) => {
		const data = item;
		const currentDate = new Date();
		const formattedDate = formatDate(currentDate);
		data.dateCreated = formattedDate;
		const result = await addReader(data);
		if (result.result === true) {
			toast.success(`Đã lập thẻ độc giả cho ${item.fullName}`, toastOption)
			await deleteRequest(item.student_id);
			onSignal('fetchDataRequest')
			onSignal('fetchData')
		} else {
			toast.warning(result.msg || result.error, toastOption)
		}
	}

	const handleDelRequest = async (student_id) => {
		await deleteRequest(student_id);
		onSignal("fetchDataRequest")
	}


	const handleOnSignalFromUpdate = () => {
		onSignal("fetchData")
	}

	const renderMessage = () => {
		let msg = ''
		if (action.type === 'DEL_READER') {
			msg = `Độc giả ${action.data?.name} không?`
		} else if (action.type === 'DEL_REQUEST_READER') {
			msg = `từ chối lập thẻ độc giả có mã ${action.data?.student_id} không?`

		} else if (action.type === 'ACCEPT_REQUEST') {
			msg = `chấp nhận thẻ độc giả tên ${action.data?.fullName} không?`
		}

		return msg
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
						<tr key={index} >
							<td>{item.fullName}</td>
							<td>{item.birthday}</td>
							<td>{item.address}</td>
							<td>{item.email}</td>
							{type && <td>{item.dateCreated}</td>}
							<td>{item.typeOfReader}</td>
							{!type && (<td> <Button success onClick={() => {
								handleAccept(item)
								setAction({
									type: 'ACCEPT_REQUEST',
									data: {
										item: item
									}
								})
							}}> <FontAwesomeIcon isIcon icon={faCheck} /> </Button>
								<Button warning onClick={() => {
									setAction({
										type: 'DEL_REQUEST_READER',
										data: {
											student_id: item.student_id
										}
									})
									setIsOpen(true)
								}}>
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
											<Button isIcon onClick={() => {
												setIsOpen(true)
												setAction({
													type: 'DEL_READER',
													data: {
														name: item.fullName,
														id: item.id
													}
												})
											}}>
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


			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setIsOpen(false)}
				style={customStyles}
				overlayClassName={cx('modal-overlay')}
			>
				<div className={cx('modal')}>

					<h3 className={cx('modal-heading')}>Xác nhận xóa sách</h3>
					<div className={cx('modal-form')}>
						Bạn chắc chắn muốn xóa
						<h4>{renderMessage()}</h4>
					</div>

					<div className={cx('modal-actions')}>
						<Button onClick={() => {
							if (action.type === 'DEL_READER') {
								handleDel(action.data.name, action.data.id)
							} else if (action.type === 'DEL_REQUEST_READER') {
								handleDelRequest(action.data.student_id)
							} else if (action.type === 'ACCEPT_REQUEST') {
								handleAccept(action.data.item)
							}
							setIsOpen(false)
						}}>Thực hiện</Button>
						<Button onClick={() => setIsOpen(false)}>Hủy</Button>
					</div>

				</div>
			</Modal>
			<ToastContainer />

		</div >

	);
};

export default TableWithPagination;