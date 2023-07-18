import React, { useState } from 'react';
import styles from './Regulation.module.scss';
// import Modal from 'react-modal';
import classNames from 'classnames/bind';
import { deleteRegulation } from '@/service/regulationService';
import UpdateRegulationModal from './updateRegulationModal';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'
import { toast } from 'react-toastify';
import toastOption from '@/utils/toastOption';

const cx = classNames.bind(styles);
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const TableWithPagination = ({ data, itemsPerPage, onSignal }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [deletedItem, setDeletedItem] = useState()

	// Tính toán số trang dựa trên số lượng dữ liệu và số lượng dữ liệu trên mỗi trang
	let totalPages = Math.ceil(data.length / itemsPerPage);

	// Lấy dữ liệu cho trang hiện tại
	const getDataForCurrentPage = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
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

	const handleDel = async () => {
		await deleteRegulation(deletedItem.id);
		onSignal(deletedItem.id)
		setIsOpen(false)
		toast.success('Xóa thành công', toastOption)
	};


	const handleOnSignalFromUpdate = () => {
		onSignal("fetchData")
	}

	return (
		<div>
			<table className={cx('full-width-table')}>
				<thead>
					<tr>
						<td>Tên</td>
						<td>Giá trị mặc định</td>
						<td>Giá trị hiện tại</td>
						<td width="10%">Thao tác</td>
					</tr>
				</thead>
				<tbody>
					{getDataForCurrentPage().map((item, index) => (
						<tr key={index}>
							<td>{item.name}</td>
							<td>{item.default_value}</td>
							<td>{item.current_value}</td>
							<td >
								<UpdateRegulationModal onSignal={handleOnSignalFromUpdate} data={item} />
								<Button isIcon onClick={() => {
									setIsOpen(true)
									setDeletedItem({
										name: item.name,
										id: item.id
									})
								}
								}>
									<FontAwesomeIcon icon={faTrash} />
								</Button>
							</td>
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

					<h3 className={cx('modal-heading')}>Xác nhận xóa Quy định</h3>
					<div className={cx('modal-form')}>
						Bạn chắc chắn muốn xóa quy định <h4>{deletedItem?.name}</h4>
					</div>

					<div className={cx('modal-actions')}>
						<Button onClick={handleDel}>Xóa</Button>
						<Button onClick={() => setIsOpen(false)}>Hủy</Button>
					</div>
				</div>
			</Modal>
		</div >

	);
};

export default TableWithPagination;