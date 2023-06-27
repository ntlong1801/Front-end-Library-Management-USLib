import React, { useState } from 'react';
import axios from 'axios';
import './MakingLoan.css';

function MakingLoan() {
	const [studentId, setStudentId] = useState('');
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [bookIds, setBookIds] = useState([]);
	const [message, setMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Kiểm tra token trong localStorage ở đây (refresh_token)
		const token = localStorage.getItem('refresh_token');

		// Tạo payload dữ liệu để gửi lên API
		const payload = {
			student_id: studentId,
			name: name,
			date: date,
			book_ids: bookIds,
		};

		try {
			// Gọi API backend với phương thức POST
			const response = await fetch('http://localhost:5000/api/record', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			// Kiểm tra và hiển thị kết quả từ API
			if (response.ok) {
				const data = await response.json();
				setMessage(data.msg);
			} else {
				setMessage('Có lỗi xảy ra khi gửi yêu cầu.');
			}
		} catch (error) {
			setMessage('Có lỗi xảy ra khi gửi yêu cầu.');
		}
	};

	return (
		<div className='container'>
			<h1> Lập phiếu mượn </h1>{' '}
			<form onSubmit={handleSubmit}>
				<div>
					<label> Mã số sinh viên: </label>{' '}
					<input
						type='text'
						value={studentId}
						onChange={(e) => setStudentId(e.target.value)}
					/>{' '}
				</div>{' '}
				<div>
					<label> Tên sinh viên: </label>{' '}
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>{' '}
				</div>{' '}
				<div>
					<label> Ngày mượn(dd / mm / yyyy): </label>{' '}
					<input
						type='text'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>{' '}
				</div>{' '}
				<div>
					<label> Danh sách ID sách(phân cách bằng dấu phẩy): </label>{' '}
					<input
						type='text'
						value={bookIds}
						onChange={(e) => setBookIds(e.target.value.split(','))}
					/>{' '}
				</div>{' '}
				<button type='submit'> Xác nhận </button>{' '}
			</form>{' '}
			{message && <p> {message} </p>}{' '}
		</div>
	);
}

export default MakingLoan;
