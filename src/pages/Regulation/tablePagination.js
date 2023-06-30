import React, { useState } from 'react';
import styles from './Regulation.module.scss';
// import Modal from 'react-modal';
import classNames from 'classnames/bind';
import { deleteRegulation } from '@/service/regulationService';
import UpdateRegulationModal from './updateRegulationModal';
import Button from '@/components/Button';
import Tippy from '@tippyjs/react/headless';
import Popper from '@/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListDots, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const TableWithPagination = ({ data, searchResults, name, itemsPerPage, onSignal }) => {
	const [currentPage, setCurrentPage] = useState(1);

	// Tính toán số trang dựa trên số lượng dữ liệu và số lượng dữ liệu trên mỗi trang
	let totalPages = Math.ceil(data.length / itemsPerPage);
	if (name !== '') {
		totalPages = Math.ceil(searchResults.length / itemsPerPage)
	}

	// Lấy dữ liệu cho trang hiện tại
	const getDataForCurrentPage = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		if (name !== '')
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
			await deleteRegulation(id);
			onSignal(id)
		}
	};


	const handleOnSignalFromUpdate = () => {
		onSignal("fetchData")
	}

	const cx = classNames.bind(styles);

	const TableWithPagination = ({ data, itemsPerPage, onSignal }) => {
		const [currentPage, setCurrentPage] = useState(1);

		// Tính toán số trang dựa trên số lượng dữ liệu và số lượng dữ liệu trên mỗi trang
		let totalPages = Math.ceil(data.length / itemsPerPage);


		// Lấy dữ liệu cho trang hiện tại
		const getDataForCurrentPage = () => {
			const startIndex = (currentPage - 1) * itemsPerPage;
			const endIndex = startIndex + itemsPerPage;
			return data.slice(startIndex, endIndex);
		};

		return (
			<div>

				<table className={cx('full-width-table')}>
					<thead>
						<tr>
							<td width="30%">Tên</td>
							<td>Giá trị mặc định</td>
							<td>Giá trị hiện tại</td>
							<td className={cx('table-button')} style={{ "width": "10%" }}>
								Thao tác
							</td>
						</tr>
					</thead>
					<tbody>
						{getDataForCurrentPage().map((item, index) => (
							<tr key={item.id} >
								<td>{item.name}</td>
								<td>{item.default_value}</td>
								<td>{item.current_value}</td>
								<td>
									<Tippy
										interactive
										placement='top-start'
										render={attrs => <div {...attrs} className='box'
											tabIndex='-1'>
											<Popper className={cx('sub-menu')}>
												<UpdateRegulationModal onSignal={handleOnSignalFromUpdate} data={item} />
												<Button isIcon onClick={() => handleDel(item.name, item.id)}>
													<FontAwesomeIcon icon={faTrash} />
												</Button>
											</Popper>
										</div>}>
										<Button isIcon className={cx('action')}>
											<FontAwesomeIcon icon={faListDots} />
										</Button>
									</Tippy>
								</td>
							</tr>
						))}

					</tbody>
				</table >


				{/* Hiển thị phân trang */}
				< div className={cx('pagination')} >
					<Button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</Button>
					<span>{currentPage} / {totalPages}</span>
					<Button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</Button>
				</div>
			</div >
		);
	};
}

export default TableWithPagination;
