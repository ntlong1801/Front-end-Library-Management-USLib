import React, { useState } from 'react';
import './record.css';
import Button from '@/components/Button';

function Record() {
	const [activeTab, setActiveTab] = useState('borrow');
	const [studentIdBorrow, setStudentIdBorrow] = useState('');
	const [studentIdSearch, setStudentIdSearch] = useState('');
	const [studentIdReturn, setStudentIdReturn] = useState('');
	const [nameBorrow, setNameBorrow] = useState('');
	const [dateBorrow, setDateBorrow] = useState('');
	const [dateReturn, setDateReturn] = useState('');
	const [bookIdsBorrow, setBookIdsBorrow] = useState('');
	const [bookIdsReturn, setBookIdsReturn] = useState('');
	const [responseMsg, setResponseMsg] = useState('');
	const accessToken = localStorage.getItem('refresh_token');

	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setResponseMsg('');
	};

	const handleBorrowSubmit = async () => {
		try {
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
					book_ids: bookIdsBorrow.split(',').map((id) => id.trim()),
				}),
			});
			const data = await response.json();
			setResponseMsg(data.msg);
		} catch (error) {
			setResponseMsg('Có lỗi khi gửi yêu cầu');
		}
	};

	const handleSearchSubmit = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/record/:${studentIdSearch}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = await response.json();
			setResponseMsg(data.msg);
		} catch (error) {
			setResponseMsg('Có lỗi khi gửi yêu cầu');
		}
	};

	const handleReturnSubmit = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/record/return', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					student_id: studentIdReturn,
					date: dateReturn,
					book_ids: bookIdsReturn.split(',').map((id) => id.trim()),
				}),
			});
			const data = await response.json();
			setResponseMsg(data.msg);
		} catch (error) {
			setResponseMsg('Có lỗi khi gửi yêu cầu');
		}
	};
	return (
		<div className='record-page'>
			<div className='tab-buttons'>
				<Button
					className='tab-btn'
					active={activeTab === 'borrow' ? 'active' : ''}
					onClick={() => handleTabChange('borrow')}
				>
					Lập phiếu mượn
				</Button>
				<Button
					className='tab-btn'
					active={activeTab === 'search' ? 'active' : ''}
					onClick={() => handleTabChange('search')}
				>
					Tra cứu phiếu mượn
				</Button>
				<Button
					className='tab-btn'
					active={activeTab === 'return' ? 'active' : ''}
					onClick={() => handleTabChange('return')}
				>
					Lập phiếu trả sách
				</Button>
			</div>
			{activeTab === 'borrow' && (
				<div className='tab-content'>
					<div className='input-group'>
						<label htmlFor='studentId'> Mã số sinh viên: </label>
						<input
							type='text'
							id='studentId'
							value={studentIdBorrow}
							onChange={(e) => setStudentIdBorrow(e.target.value)}
							className='student-id'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='name'> Tên sinh viên: </label>
						<input
							type='text'
							id='name'
							value={nameBorrow}
							onChange={(e) => setNameBorrow(e.target.value)}
							className='name'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='date'> Ngày mượn: </label>
						<input
							type='date'
							id='date'
							value={dateBorrow}
							onChange={(e) => setDateBorrow(e.target.value)}
							className='date'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='bookIds'> Danh sách mã sách: </label>
						<input
							type='text'
							id='bookIds'
							value={bookIdsBorrow}
							onChange={(e) => setBookIdsBorrow(e.target.value)}
							className='book-ids'
						/>
					</div>
					<button
						className='submit-btn'
						onClick={handleBorrowSubmit}
					>
						Lập phiếu mượn
					</button>
				</div>
			)}
			{activeTab === 'search' && (
				<div className='tab-content'>
					<div className='input-group'>
						<label htmlFor='studentId'> Mã số sinh viên: </label>
						<input
							type='text'
							id='studentId'
							value={studentIdSearch}
							onChange={(e) => setStudentIdSearch(e.target.value)}
							className='student-id'
						/>
					</div>
					<button
						className='submit-btn'
						onClick={handleSearchSubmit}
					>
						Tra cứu phiếu mượn
					</button>
				</div>
			)}
			{activeTab === 'return' && (
				<div className='tab-content'>
					<div className='input-group'>
						<label htmlFor='studentId'> Mã số sinh viên: </label>
						<input
							type='text'
							id='studentId'
							value={studentIdReturn}
							onChange={(e) => setStudentIdReturn(e.target.value)}
							className='student-id'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='date'> Ngày mượn: </label>
						<input
							type='date'
							id='date'
							value={dateReturn}
							onChange={(e) => setDateReturn(e.target.value)}
							className='date'
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='bookIds'> Danh sách mã sách: </label>
						<input
							type='text'
							id='bookIds'
							value={bookIdsReturn}
							onChange={(e) => setBookIdsReturn(e.target.value)}
							className='book-ids'
						/>
					</div>
					<button
						className='submit-btn'
						onClick={handleReturnSubmit}
					>
						Lập phiếu trả sách
					</button>
				</div>
			)}
			{responseMsg && <div className='response-msg'> {responseMsg} </div>}
		</div>
	);
}

export default Record;
