import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import Popper from '@/components/Popper';
import Button from '@/components/Button';
import styles from './Record.module.scss';
import * as bookService from '@/service/bookService'
import unicodeToASCII from '@/utils/unicodeToASCII';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import toastOption from '@/utils/toastOption';
const cx = classNames.bind(styles);

function Record () {
	const [activeTab, setActiveTab] = useState('borrow');
	const [studentIdBorrow, setStudentIdBorrow] = useState('');
	const [studentIdSearch, setStudentIdSearch] = useState('');
	const [studentIdReturn, setStudentIdReturn] = useState('');
	const [nameBorrow, setNameBorrow] = useState('');
	const [dateBorrow, setDateBorrow] = useState('');
	const [dateReturn, setDateReturn] = useState('');
	const [bookIdsBorrow, setBookIdsBorrow] = useState([]);
	const [bookIdsReturn, setBookIdsReturn] = useState([]);
	const accessToken = localStorage.getItem('refresh_token');

	const [books, setBooks] = useState(undefined)

	const [searchKeyword, setSearchKeyword] = useState('')
	const [searchResult, setSearchResult] = useState([])

	const [records, setRecords] = useState([])

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const handleBorrowSubmit = async () => {
		try {
			if (studentIdBorrow.length === 8 && dateBorrow.length !== 0 && bookIdsBorrow.length > 0) {

				const response = await fetch('http://localhost:5000/api/record', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						student_id: studentIdBorrow,
						name: nameBorrow,
						date: dateBorrow,
						book_ids: bookIdsBorrow.map(item => item.id),
					}),
				});
				const data = await response.json();
				if (data.result) {
					toast.success(data.msg, toastOption)
				} else {
					toast.warning(data.msg, toastOption)
				}
			} else {
				toast.warning('Vui lòng nhập đầy đủ thông tin', toastOption)
			}
		} catch (error) {
			toast.error('Có lỗi hệ thống. Vui lòng thử lại sau', toastOption)
		}
	};

	const handleSearchSubmit = async () => {
		try {

			if (studentIdSearch.length > 0) {
				const response = await fetch(`http://localhost:5000/api/record/${studentIdSearch}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const data = await response.json();
				setRecords(data.data.records)
			} else {
				toast.warning('Vui lòng nhập đầy đủ mã số', toastOption)
			}
		} catch (error) {
			toast.error('Có lỗi hệ thống. Vui lòng thử lại sau', toastOption)
		}
	};

	const handleReturnSubmit = async () => {
		try {
			if (studentIdReturn.length === 8 && dateReturn.length !== 0 && bookIdsReturn.length > 0) {
				const response = await fetch('http://localhost:5000/api/record/return', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						student_id: studentIdReturn,
						date: dateReturn,
						book_ids: bookIdsReturn.map(item => item.id),
					}),
				});
				const data = await response.json();
				if (data.result) {
					toast.success(data.msg, toastOption)

					setStudentIdReturn('')
					setBookIdsReturn([])
				} else {
					toast.warning(data.msg, toastOption)
				}
			} else {
				toast.warning('Vui lòng nhập đầy đủ thông tin', toastOption)

			}

		} catch (error) {
			toast.error('Có lỗi hệ thống. Vui lòng thử lại sau', toastOption)

		}
	};

	const handleSearchBook = () => {
		let res = []
		if (searchResult.length === 0) {
			res = [...books]
		} else {
			Array.from(books).forEach((item) => {
				const left = unicodeToASCII(`${item.id}-${item.name}`.toLowerCase())
				const right = unicodeToASCII(searchKeyword.toLowerCase())
				if (left.includes(right)) {
					res.push(item)
				}
			})

		}
		setSearchResult(res)
	}

	const handleAddBook = (book) => {
		if (activeTab === 'borrow') {
			setBookIdsBorrow(prev => {
				const isExisting = Array.from(prev).find((item) => item.id === book.id)
				if (isExisting === undefined) {
					return [
						...prev,
						{ id: book.id, name: book.name }
					]
				} else {
					toast.error('Sách đã có trong danh sách mượn', toastOption)
					return prev
				}
			})
		} else if (activeTab === 'return') {
			setBookIdsReturn(prev => {
				const isExisting = Array.from(prev).find((item) => item.id === book.id)
				if (isExisting === undefined) {
					return [
						...prev,
						{ id: book.id, name: book.name }
					]
				} else {
					toast.error('Sách đã có trong danh sách mượn', toastOption)
					return prev
				}
			})
		}
		setSearchKeyword('')
	}
	const handleRemoveBook = (book) => {
		if (activeTab === 'borrow') {
			setBookIdsBorrow(prev => {
				return Array.from(prev).filter((item) => {
					return item.id !== book.id
				})
			})
		} else if (activeTab === 'return') {
			setBookIdsReturn(prev => {
				return Array.from(prev).filter((item) => {
					return item.id !== book.id
				})
			})
		}
	}



	useEffect(() => {
		async function fetchAllBook () {
			const res = await bookService.getAllBook()
			setBooks(res.books)
		}

		fetchAllBook()
	}, [])

	return (
		<div className={cx('record-page')}>
			<div className={cx('tab-buttons')}>
				<Button
					className={cx('tab-btn')}
					active={activeTab === 'borrow' ? 'active' : ''}
					onClick={() => handleTabChange('borrow')}
				>
					Lập phiếu mượn
				</Button>
				<Button
					className={cx('tab-btn')}
					active={activeTab === 'search' ? 'active' : ''}
					onClick={() => handleTabChange('search')}
				>
					Tra cứu phiếu mượn
				</Button>
				<Button
					className={cx('tab-btn')}
					active={activeTab === 'return' ? 'active' : ''}
					onClick={() => handleTabChange('return')}
				>
					Lập phiếu trả sách
				</Button>
			</div>

			{activeTab === 'borrow' && (
				<div className={cx('tab-content')}>
					<div className={cx('input-group')}>
						<label htmlFor='studentId'> Mã số sinh viên: </label>
						<input
							type='text'
							id='studentId'
							value={studentIdBorrow}
							onChange={(e) => setStudentIdBorrow(e.target.value)}
							className={cx('student-id')}
						/>
					</div>
					<div className={cx('input-group')}>
						<label htmlFor='name'> Tên sinh viên: </label>
						<input
							type='text'
							id='name'
							value={nameBorrow}
							onChange={(e) => setNameBorrow(e.target.value)}
							className={cx('name')}
						/>
					</div>
					<div className={cx('input-group')}>
						<label htmlFor='date'> Ngày mượn: </label>
						<input
							type='date'
							id='date'
							value={dateBorrow}
							onChange={(e) => setDateBorrow(e.target.value)}
							className={cx('date')}
						/>
					</div>

					<div className={cx('input-group')}>
						<label htmlFor='bookIds'> Tìm mã sách: </label>
						<Tippy
							visible={searchResult.length > 0 && searchKeyword.length !== 0}
							interactive
							placement='bottom-start'
							render={attrs => <div {...attrs} className='box'
								tabIndex='-1'>
								<Popper className={cx('sub-menu')}>
									{searchResult.map((book, index) => {
										return <li key={index} className={cx('menu-item')} onClick={() => {
											handleAddBook(book)
										}}>
											{book.id} - {book.name}
										</li>
									})}
								</Popper>
							</div>}>
							<input
								type='text'
								id='bookIds'
								value={searchKeyword}
								onChange={(e) => {
									setSearchKeyword(e.target.value)
									handleSearchBook()
								}}
								className={cx('book-ids')}
							/>
						</Tippy>
					</div>

					<div className={cx('input-group')}>
						<label > Danh sách mã: </label>
						<div className={cx('book-list')}>
							{bookIdsBorrow.map((book, index) => {
								return <li className={cx('selected-book')} key={index}>
									{book.id} - {book.name}
									<span className={cx('remove-icon')} onClick={() => {
										handleRemoveBook(book)
									}}>
										<FontAwesomeIcon icon={faTimesCircle} />
									</span>
								</li>
							})}
						</div>
					</div>

					<button
						className={cx('submit-btn', 'right')}
						onClick={handleBorrowSubmit}
					>
						Lập phiếu mượn
					</button>
				</div >
			)
			}
			{
				activeTab === 'search' && (
					<div className={cx('tab-content')}>
						<div className={cx('input-group')}>
							<label htmlFor='studentId'> Mã số sinh viên: </label>
							<input
								type='text'
								id='studentId'
								value={studentIdSearch}
								onChange={(e) => setStudentIdSearch(e.target.value)}
								className={cx('student-id')}
							/>

							<button
								className={cx('submit-btn')}
								onClick={handleSearchSubmit}
							>
								Tra cứu phiếu mượn
							</button>
						</div>

						<div className={cx('records')}>
							{
								records.map((record, index) => {
									return <div className={cx('record-item')} key={index}>
										<div className={cx('record-info')}>
											<h5>{index + 1}. Họ tên: {record.name}</h5>
											<h5>Ngày mượn: {record.date}</h5>
											<h5>Trạng thái: {record.is_return ? 'Đã trả toàn bộ' : 'Chưa trả'}</h5>
										</div>
										<ol className={cx('record-books')}>
											<h5 >Sách đã mượn: </h5>
											{record.book_ids.map((book, i) => {
												return <li className={cx('record-book-item')} key={i}>
													<p>STT: {i + 1}</p>
													<div>
														<p>id: {book.id}</p>
														<p>Trạng thái: {book.is_return ? 'Đã trả' : 'Chưa trả'}</p>
														<p>Ngày trả: {book.return_date !== null ? book.return_date : 'Chưa trả'}</p>
													</div>
												</li>
											})}

										</ol>
									</div>
								})
							}

							{records.length === 0 && <h5 style={{ 'textAlign': 'center' }}>Chưa có hồ sơ mượn sách</h5>}


						</div>

					</div>
				)
			}
			{
				activeTab === 'return' && (
					<div className={cx('tab-content')}>
						<div className={cx('input-group')}>
							<label htmlFor='studentId'> Mã số sinh viên: </label>
							<input
								type='text'
								id='studentId'
								value={studentIdReturn}
								onChange={(e) => setStudentIdReturn(e.target.value)}
								className={cx('student-id')}
							/>
						</div>
						<div className={cx('input-group')}>
							<label htmlFor='date'> Ngày mượn: </label>
							<input
								type='date'
								id='date'
								value={dateReturn}
								onChange={(e) => setDateReturn(e.target.value)}
								className={cx('date')}
							/>
						</div>

						<div className={cx('input-group')}>
							<label htmlFor='bookIds'> Tìm mã sách: </label>
							<Tippy
								visible={searchResult.length > 0 && searchKeyword.length !== 0}
								interactive
								placement='bottom-start'
								render={attrs => <div {...attrs} className='box'
									tabIndex='-1'>
									<Popper className={cx('sub-menu')}>
										{searchResult.map((book, index) => {
											return <li key={index} className={cx('menu-item')} onClick={() => {
												handleAddBook(book)
											}}>
												{book.id} - {book.name}
											</li>
										})}
									</Popper>
								</div>}>
								<input
									type='text'
									id='bookIds'
									value={searchKeyword}
									onChange={(e) => {
										setSearchKeyword(e.target.value)
										handleSearchBook()
									}}
									className={cx('book-ids')}
								/>
							</Tippy>
						</div>

						<div className={cx('input-group')}>
							<label > Danh sách mã: </label>
							<div className={cx('book-list')}>
								{bookIdsReturn.map((book, index) => {
									return <li className={cx('selected-book')} key={index}>
										{book.id} - {book.name}
										<span className={cx('remove-icon')} onClick={() => {
											handleRemoveBook(book)
										}}>
											<FontAwesomeIcon icon={faTimesCircle} />
										</span>
									</li>
								})}
							</div>
						</div>

						<button
							className={cx('submit-btn', 'right')}
							onClick={handleReturnSubmit}
						>
							Lập phiếu trả sách
						</button>
					</div>
				)
			}
			<ToastContainer />
		</div >
	);
}

export default Record;
