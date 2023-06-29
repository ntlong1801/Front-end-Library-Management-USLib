import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleInfo, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import Button from '@/components/Button';
import Popper from '@/components/Popper';
import * as searchService from '@/service/searchService';
import * as bookService from '@/service/bookService';
import * as genreSearch from '@/service/genreService';

const cx = classNames.bind(styles);
const status = ['Có sẵn', 'Hết hàng'];

function Search() {
	const [keyword, setKeyword] = useState({
		name: '',
	});

	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isShowDetail, setIsShowDetail] = useState(false);
	const [book, setBook] = useState();
	const [showFilter, setShowFilter] = useState(false);
	const [genres, setGenres] = useState([]);

	const handleSearch = async () => {
		setLoading(true);
		const data = await searchService.search({
			params: {
				...keyword,
			},
		});
		setLoading(false);
		setSearchResult(data.books);
	};

	const handleGetAll = async () => {
		setLoading(true);
		const data = await bookService.getAllBook();
		setLoading(false);
		setSearchResult(data.books);
	};

	useEffect(() => {
		async function fetchGenre() {
			const data = await genreSearch.getAll();

			setGenres(data.genres);
		}

		fetchGenre();
	}, []);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('header')}>
				<div className={cx('search')}>
					<input
						name='name'
						className={cx('search-control')}
						placeholder='Nhập tên sách'
						value={keyword.name}
						onChange={(e) => {
							setKeyword((prevState) => {
								return {
									...prevState,
									[e.target.name]: e.target.value,
								};
							});
						}}
					/>
				</div>
				<Button onClick={handleSearch}>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</Button>

				<Tippy
					placement='bottom'
					visible={showFilter}
					interactive
					render={(attrs) => (
						<div
							className='box'
							tabIndex='-1'
							{...attrs}
						>
							<Popper className={cx('filter-popper')}>
								<div className={cx('filter')}>
									<div className={cx('filter-group')}>
										<label className={cx('filter-label')}>Thể loại: </label>
										<select
											onChange={(e) => {
												setKeyword((prevState) => {
													return {
														...prevState,
														genre: e.target.value,
													};
												});
											}}
										>
											<option disabled>--Chọn--</option>
											{genres.map((genre) => (
												<option value={genre.abbreviation}>{genre.name}</option>
											))}
										</select>
									</div>
									<div className={cx('filter-group')}>
										<label className={cx('filter-label')}>Tình trạng: </label>
										<select
											onChange={(e) => {
												setKeyword((prevState) => {
													return {
														...prevState,
														status: e.target.value,
													};
												});
											}}
										>
											<option disabled>--Chọn--</option>
											{status.map((status) => (
												<option value={status}>{status}</option>
											))}
										</select>
									</div>
								</div>
							</Popper>
						</div>
					)}
					onClickOutside={() => setShowFilter(false)}
				>
					<Button onClick={() => setShowFilter(true)}>Bộ lọc</Button>
				</Tippy>
				<Button onClick={handleGetAll}>Tất cả sách</Button>
			</div>
			<div className={cx('body')}>
				{!isShowDetail ? (
					<table className={cx('result')}>
						<thead>
							<tr>
								<td width='15%'>ID</td>
								<td width='30%'>Tên</td>
								<td width='10%'>Thể loại</td>
								<td width='20%'>Tác giả</td>
								<td width='5%'>Tình trạng</td>
								<td width='5%'>Ngày nhập</td>
								<td width='5%'>Thao tác</td>
							</tr>
						</thead>
						<tbody>
							{searchResult.length > 0 ? (
								searchResult.map((book, index) => {
									return (
										<tr key={index}>
											<td>{book.id}</td>
											<td>{book.name}</td>
											<td>{book.genre}</td>
											<td>{book.author}</td>
											<td>{book.status}</td>
											<td>{book.imported_date}</td>
											<td>
												<Button
													className={cx('btn-info')}
													onClick={() => {
														setIsShowDetail(true);
														setBook(book);
													}}
												>
													<FontAwesomeIcon icon={faCircleInfo} />
												</Button>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td
										colSpan='7'
										style={{ textAlign: 'center' }}
									>
										{loading ? 'Vui lòng đợi...' : 'Danh sách trống'}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				) : (
					<div className={cx('detail')}>
						<div className={cx('control')}>
							<Button
								onClick={() => {
									setIsShowDetail(false);
								}}
							>
								<FontAwesomeIcon icon={faArrowLeft} />
							</Button>
						</div>
						<div className={cx('detail-inner')}>
							<div className={cx('photos')}>
								<img
									src={book.photos[0]}
									alt='cover page'
								/>
							</div>

							<div className={cx('info')}>
								<h3 className={cx('heading')}>Thông tin cơ bản</h3>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Mã sách:</span>
									<span className={cx('field-content')}>{book.id}</span>
								</div>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Tên sách:</span>
									<span className={cx('field-content')}>{book.name}</span>
								</div>
								<h3 className={cx('heading')}>Thông tin xuất xư</h3>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Tác giả:</span>
									<span className={cx('field-content')}>{book.author}</span>
								</div>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Năm xuất bản:</span>
									<span className={cx('field-content')}>{book.published_year}</span>
								</div>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Nhà xuất bản:</span>
									<span className={cx('field-content')}>{book.publisher}</span>
								</div>

								<h3 className={cx('heading')}>Tình trạng</h3>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Số lượng sách hiện có:</span>
									<span className={cx('field-content')}>{book.number}</span>
								</div>
								<div className={cx('field')}>
									<span className={cx('field-heading')}>Tình trạng:</span>
									<span className={cx('field-content', 'active')}>{book.status}</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Search;
