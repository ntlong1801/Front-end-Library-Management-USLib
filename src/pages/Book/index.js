import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Book.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMagnifyingGlass, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bookService from '@/service/bookService';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function Book() {
	const [books, setBooks] = useState([]);
	const [tab, setTab] = useState(1);
	const [newBook, setNewBook] = useState({
		id: '',
		name: '',
		genre: '',
		author: '',
		publishedYear: 0,
		publisher: '',
		number: 0,
		status: '',
	});

	const [photos, setPhotos] = useState();

	const hanleChange = (e) => {
		setNewBook((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleChangeFile = (e) => {
		setPhotos(() => {
			const file = e.target.files[0];
			file.url = URL.createObjectURL(file);

			return file;
		});
	};

	const handleCreateBook = async () => {
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

		const result = await bookService.createBook(dataForm, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		console.log(result);
		handleReset();
	};

	const handleDeleteBook = async (name, id) => {
		// eslint-disable-next-line no-restricted-globals
		const isDelete = confirm(`Bạn chắc chắn muốn xóa ${name}`);

		if (isDelete) {
			const result = await bookService.deleteBook(id);
			setBooks((prev) => {
				return prev.filter((book) => {
					return book.id !== id;
				});
			});
			console.log(result);
		}
	};

	const handleReset = () => {
		setNewBook(() => {
			return {
				id: '',
				name: '',
				photos: [],
				genre: '',
				author: '',
				publishedYear: 0,
				publisher: '',
				number: 0,
				status: '',
			};
		});

		setPhotos('');
	};

	useEffect(() => {
		async function fetchBook() {
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
				<button
					className={cx('tab', { active: tab === 1 })}
					onClick={() => setTab(1)}
				>
					Tất cả sách
				</button>
				<button
					className={cx('tab', { active: tab === 2 })}
					onClick={() => setTab(2)}
				>
					Thêm sách
				</button>
				<div className={cx('search')}>
					<input
						className={cx('search-control')}
						placeholder='Tìm kiếm'
					/>
				</div>
				<button className={cx('tab')}>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
			</div>

			<div className={cx('content')}>
				<table className={cx('content-item', 'table', { active: tab === 1 })}>
					<thead>
						<tr>
							<td width='15%'>ID</td>
							<td width='25%'>Tên</td>
							<td width='10%'>Thể loại</td>
							<td width='20%'>Tác giả</td>
							<td>Tình trạng</td>
							<td>Ngày nhập</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					<tbody>
						{books.map((book, index) => {
							return (
								<tr key={index}>
									<td>{book.id}</td>
									<td>{book.name}</td>
									<td>{book.genre}</td>
									<td>{book.author}</td>
									<td>{book.status}</td>
									<td>{book.imported_date}</td>
									<td>
										<button className={cx('action')}>
											<FontAwesomeIcon icon={faPen} />
										</button>
										<button
											className={cx('action')}
											onClick={() => handleDeleteBook(book.name, book.id)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className={cx('content-item', { active: tab === 2 })}>
					<div className={cx('form-container')}>
						<div className={cx('form-photos')}>
							<label
								htmlFor='form-file'
								className={cx('form-label')}
							>
								<img
									src={photos ? photos.url : images.logo}
									alt='Logo'
								/>
							</label>
							<input
								onChange={handleChangeFile}
								hidden
								id='form-file'
								className={cx('form-file')}
								type='file'
							/>
							<button className={cx('form-photos-btn', 'left')}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<button className={cx('form-photos-btn', 'right')}>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
						<div className={cx('form-info')}>
							<h3 className={cx('form-heading')}>Nhập thông tin yêu cầu</h3>
							<input
								name='id'
								className={cx('form-control')}
								placeholder='Mã sách'
								value={newBook.id}
								onChange={hanleChange}
							/>
							<input
								name='name'
								className={cx('form-control')}
								placeholder='Tên sách'
								value={newBook.name}
								onChange={hanleChange}
							/>
							<br />
							<input
								name='genre'
								className={cx('form-control', 'mt-12')}
								placeholder='Thể loại'
								value={newBook.genre}
								onChange={hanleChange}
							/>
							<h3 className={cx('form-heading')}>Nhập thông tin bổ sung</h3>
							<div>
								<input
									name='author'
									className={cx('form-control')}
									placeholder='Tác giả'
									value={newBook.author}
									onChange={hanleChange}
								/>
								<input
									name='publishedYear'
									className={cx('form-control')}
									placeholder='Năm xuất bản'
									value={newBook.publishedYear}
									onChange={hanleChange}
									type='number'
								/>
								<input
									name='publisher'
									className={cx('form-control')}
									placeholder='Nhà sản xuất'
									value={newBook.publisher}
									onChange={hanleChange}
								/>
							</div>

							<div className='mt-12'>
								<input
									name='number'
									className={cx('form-control')}
									placeholder='Số lượng sách'
									type='number'
									value={newBook.number}
									onChange={hanleChange}
								/>
								<input
									name='status'
									className={cx('form-control')}
									placeholder='Tình trạng'
									value={newBook.status}
									onChange={hanleChange}
								/>
							</div>

							<button
								className={cx('tab', 'mt-12')}
								onClick={handleReset}
							>
								Reset
							</button>
							<button
								className={cx('tab', 'mt-12')}
								onClick={handleCreateBook}
							>
								Thêm
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Book;
