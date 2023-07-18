import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListDots, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toastify.css';
import Modal from 'react-modal';

import styles from './Book.module.scss';
import * as bookService from '@/service/bookService';

import images from '@/assets/images';
import toastOption from '@/utils/toastOption';
import Button from '@/components/Button';
import Tippy from '@tippyjs/react/headless';

import Popper from '@/components/Popper';

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

const cx = classNames.bind(styles);

function Book () {
	const [books, setBooks] = useState([]);
	const [tab, setTab] = useState(1);
	const [isEditing, setIsEditing] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [nameOfDeletedBook, setNameOfDeletedBook] = useState('')

	const [newBook, setNewBook] = useState({
		id: '',
		name: '',
		genre: '',
		author: '',
		publishedYear: '',
		publisher: '',
		number: '',
		status: 'Có sẵn',
	});

	const [photos, setPhotos] = useState(undefined);
	const [editedBook, setEditedBook] = useState({
		id: '',
		name: '',
		genre: '',
		author: '',
		publishedYear: '',
		publisher: '',
		number: '',
		status: 'Có sẵn',
	});

	const [editedPhotos, setEditedPhotos] = useState(undefined);

	const hanleChange = (e) => {
		if (isEditing) {
			setEditedBook((prev) => {
				return {
					...prev,
					[e.target.name]: e.target.value,
				};
			});
		} else {
			setNewBook((prev) => {
				return {
					...prev,
					[e.target.name]: e.target.value,
				};
			});
		}
	};

	const handleChangeFile = (e) => {
		if (isEditing) {
			setEditedPhotos(() => {
				const file = e.target.files[0];
				file.url = URL.createObjectURL(file);

				return file;
			});
		} else {
			setPhotos(() => {
				const file = e.target.files[0];
				file.url = URL.createObjectURL(file);

				return file;
			});
		}
	};

	const validate = () => {
		let msg;
		const testedBook = isEditing ? editedBook : newBook;
		const keysOfBook = Object.keys(testedBook);
		for (let key of keysOfBook) {
			if (testedBook[key] === '' || testedBook[key] === 0) {
				if (key === 'id') {
					msg = 'Vui lòng nhập mã sách';
				} else if (key === 'name') {
					msg = 'Vui lòng nhập tên sách';
				} else if (key === 'genre') {
					msg = 'Vui lòng chọn loại sách';
				} else if (key === 'author') {
					msg = 'Vui lòng nhập tác giả';
				} else if (key === 'publishedYear') {
					msg = 'Vui lòng nhập năm xuất bản';
				} else if (key === 'publisher') {
					msg = 'Vui lòng nhập nhà xuất bản';
				} else if (key === 'number') {
					msg = 'Vui lòng nhập số lượng sách';
				}
				return msg;
			}
		}
		if (!isEditing) {
			if (photos === undefined) {
				msg = 'Vui lòng chọn ảnh của sách';
			}
		}

		return (msg = 'TRUE');
	};

	const handleCreateBook = async () => {
		const resultValidate = validate();
		if (resultValidate === 'TRUE') {
			const publishedYear = newBook.publishedYear;
			delete newBook.publishedYear;
			delete photos.url;

			const currentDate = new Date();
			const dataForm = new FormData();
			[photos].forEach((item) => {
				dataForm.append(`photos`, item);
			});

			dataForm.append(
				'imported_date',
				`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
			);
			dataForm.append('published_year', publishedYear);
			Object.keys(newBook).forEach((key) => {
				dataForm.append(key, newBook[key]);
			});

			const data = await bookService.createBook(dataForm, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (data.result) {
				toast.success(data.msg, toastOption);
				handleReset();
			} else {
				toast.error(data.msg, toastOption);
			}
		} else {
			toast.error(resultValidate, toastOption);
		}
	};

	const handleEditBook = async () => {
		const resultValidate = validate();
		if (resultValidate === 'TRUE') {
			const publishedYear = editedBook.publishedYear;
			delete editedBook.publishedYear;
			delete editedPhotos?.url;

			const currentDate = new Date();
			const dataForm = new FormData();

			if (typeof editedPhotos === 'string') {
				dataForm.append('is_changing_photo', false);
				dataForm.append(`photos`, 'FALSE');
			} else {
				dataForm.append('is_changing_photo', true);
				[editedPhotos].forEach((item) => {
					dataForm.append(`photos`, item);
				});
			}

			dataForm.append(
				'imported_date',
				`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
			);
			dataForm.append('published_year', publishedYear);
			Object.keys(editedBook).forEach((key) => {
				dataForm.append(key, editedBook[key]);
			});

			const id = editedBook.id;
			delete editedBook.id;

			const data = await bookService.editBook(id, dataForm, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (data.result) {
				toast.success(data.msg, toastOption);
				setIsEditing(false);
				setTab(1);
				handleReset();
			} else {
				toast.error(data.msg, toastOption);
			}
		} else {
			toast.error(resultValidate, toastOption);
		}
	};

	const handleDeleteBook = async (name, id) => {
		//eslint-disable-next-line no-restricted-globals
		const res = await bookService.deleteBook(id);
		setBooks((prev) => {
			return prev.filter((book) => {
				return book.id !== id;
			});
		});

		if (res.result) {
			toast.success(res.msg, toastOption)
		} else {
			toast.error(res.msg, toastOption)
		}
		setIsOpen(false)
	};

	const handleReset = () => {
		if (isEditing) {
			setEditedBook(() => {
				return {
					id: '',
					name: '',
					genre: '',
					author: '',
					publishedYear: '',
					publisher: '',
					number: '',
					status: 'Có sẵn',
				};
			});

			setEditedPhotos('');
		} else {
			setNewBook(() => {
				return {
					id: '',
					name: '',
					genre: '',
					author: '',
					publishedYear: '',
					publisher: '',
					number: '',
					status: 'Có sẵn',
				};
			});

			setPhotos('');
		}
	};

	const renderImage = () => {
		let source;
		if (isEditing) {
			source = typeof editedPhotos === 'string' ? editedPhotos : editedPhotos.url;
		} else {
			source = photos ? photos.url : images.logo;
		}

		return (
			<img
				src={source}
				alt='Logo'
			/>
		);
	};

	useEffect(() => {
		async function fetchBook () {
			const result = await bookService.getAllBook();

			setBooks((prev) => {
				return result.books;
			});
		}

		fetchBook();
	}, [tab]);

	useEffect(() => {
		return () => {
			photos && URL.revokeObjectURL(photos.url);
		};
	}, [photos]);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('tabs')}>
				<Button
					active={tab === 1}
					onClick={() => {
						setTab(1);
						if (isEditing) setIsEditing(false);
						setEditedPhotos(undefined);
					}}
				>
					Tất cả sách
				</Button>
				<Button
					active={tab === 2}
					onClick={() => {
						setTab(2);
						if (isEditing) setIsEditing(false);
					}}
				>
					Thêm / Chỉnh sửa sách
				</Button>
			</div>

			<div className={cx('content')}>
				<table className={cx('content-item', { active: tab === 1 })}>
					<thead>
						<tr>
							<td width='15%'>ID</td>
							<td width='30%'>Tên</td>
							<td width='10%'>Thể loại</td>
							<td width='20%'>Tác giả</td>
							<td width='5%'>Tình trạng</td>
							<td width='5%'>Ngày nhập</td>
							<td width='5%'> Thao tác</td>
						</tr>
					</thead>
					<tbody>
						{books.length > 0 ? books.map((book, index) => {
							return (
								<tr key={index}>
									<td>{book.id}</td>
									<td>{book.name}</td>
									<td>{book.genre}</td>
									<td>{book.author}</td>
									<td>{book.status}</td>
									<td>{book.imported_date}</td>
									<td style={{ "textAlign": "center" }}>
										<Tippy
											interactive
											placement='top-start'
											render={attrs => <div {...attrs} className='box'
												tabIndex='-1'>
												<Popper className={cx('sub-menu')}>
													<Button
														className={cx('action')}
														onClick={() => {
															setTab(2);
															setIsEditing(true);
															//Data
															setEditedBook({
																id: book.id,
																name: book.name,
																genre: book.genre,
																author: book.author,
																publishedYear: book.published_year,
																publisher: book.publisher,
																number: book.number,
																status: book.status,
															});

															setEditedPhotos(book.photos[0]);
														}}
													>
														<FontAwesomeIcon icon={faPen} />
													</Button>
													<Button
														className={cx('action')}
														onClick={() => {
															setNameOfDeletedBook(() => {
																return {
																	name: book.name,
																	id: book.id
																}
															});
															setIsOpen(true);
														}}
													>
														<FontAwesomeIcon icon={faTrash} />
													</Button>
												</Popper>
											</div>}>
											<Button className={cx('action')}>
												<FontAwesomeIcon icon={faListDots} />
											</Button>
										</Tippy>


									</td>
								</tr>
							);
						}) : <tr>
							<td colSpan="7" style={{ "textAlign": "center" }}>Sách đang rỗng</td>
						</tr>}
					</tbody>
				</table>

				<div className={cx('content-item', { active: tab === 2 })}>
					<div className={cx('form-container')}>
						<div className={cx('form-photos')}>
							<label
								htmlFor='form-file'
								className={cx('form-label')}
							>
								{renderImage()}
							</label>
							<input
								onChange={handleChangeFile}
								hidden
								id='form-file'
								className={cx('form-file')}
								type='file'
							/>
						</div>
						<div className={cx('form-info')}>
							<h3 className={cx('form-heading')}>Nhập thông tin yêu cầu</h3>
							<input
								disabled={isEditing}
								name='id'
								className={cx('form-control')}
								placeholder='Mã sách'
								value={isEditing ? editedBook.id : newBook.id}
								onChange={hanleChange}
							/>
							<input
								name='name'
								className={cx('form-control')}
								placeholder='Tên sách'
								value={isEditing ? editedBook.name : newBook.name}
								onChange={hanleChange}
							/>
							<br />
							<input
								name='genre'
								className={cx('form-control', 'mt-12')}
								placeholder='Thể loại'
								value={isEditing ? editedBook.genre : newBook.genre}
								onChange={hanleChange}
							/>
							<h3 className={cx('form-heading')}>Nhập thông tin bổ sung</h3>
							<div>
								<input
									name='author'
									className={cx('form-control')}
									placeholder='Tác giả'
									value={isEditing ? editedBook.author : newBook.author}
									onChange={hanleChange}
								/>
								<input
									name='publishedYear'
									className={cx('form-control')}
									placeholder='Năm xuất bản'
									value={isEditing ? editedBook.publishedYear : newBook.publishedYear}
									onChange={hanleChange}
									type='number'
								/>
								<input
									name='publisher'
									className={cx('form-control')}
									placeholder='Nhà sản xuất'
									value={isEditing ? editedBook.publisher : newBook.publisher}
									onChange={hanleChange}
								/>
							</div>

							<div className='mt-12'>
								<input
									name='number'
									className={cx('form-control')}
									placeholder='Số lượng sách'
									type='number'
									value={isEditing ? editedBook.number : newBook.number}
									onChange={hanleChange}
								/>
								{/* <input
									name='status'
									className={cx('form-control')}
									placeholder='Tình trạng'
									value={isEditing ? editedBook.status : newBook.status}
									onChange={hanleChange}
								/> */}
							</div>
							{!isEditing && (
								<Button
									onClick={handleReset}
									className='mt-12'
								>
									Reset
								</Button>
							)}
							{isEditing ? (
								<Button
									onClick={handleEditBook}
									className='mt-12'
								>
									Chỉnh sửa
								</Button>
							) : (
								<Button
									onClick={handleCreateBook}
									className='mt-12'
								>
									Thêm
								</Button>
							)}
						</div>
					</div>
				</div>
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
						Bạn chắc chắn muốn xóa sách <h4>{nameOfDeletedBook.name}</h4>
					</div>

					<div className={cx('modal-actions')}>
						<Button onClick={() => handleDeleteBook(nameOfDeletedBook.name, nameOfDeletedBook.id)}>Xóa</Button>
						<Button onClick={() => setIsOpen(false)}>Hủy</Button>
					</div>

				</div>
			</Modal>


			<ToastContainer />
		</div>
	);
}

export default Book;
