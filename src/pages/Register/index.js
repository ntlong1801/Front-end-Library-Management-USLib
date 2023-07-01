import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import images from '@/assets/images';
import * as authenServices from '@/service/authenService';

const cx = classNames.bind(styles);

function Register () {
	const [data, setData] = useState({
		id: '',
		type: 'student'
	})

	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false)

	const handleRegister = async () => {
		if (data.id.length === 8) {
			setIsError(false)
			setMessage('Vui lòng đợi...');
			const res = await authenServices.register({
				...data
			});


			setMessage((prev) => {
				if (res.result) {
					if (data.type === 'student') {
						return res.msg + '. Kiểm tra email sinh viên để lấy mật khẩu';
					} else {
						return res.msg + '. Mật khẩu của là 123456';
					}
				} else {
					setIsError(true)
				}
				return res.msg;
			});
		}
	};

	return (
		<div className={cx('wrapper')}>
			<div className={cx('header')}>
				<img
					src={images.logo}
					alt='Logo UsLib'
					className={cx('logo')}
				/>

				<h2 className={cx('heading')}>Đăng ký</h2>
				<p className={cx('des')}>Hãy kích hoạt tài khoản của bạn để sử dụng hệ thống thư viện</p>
			</div>

			<div className={cx('form-container')}>
				<div className={cx('form-group')}>
					<label className={cx('form-label')}>Mã số</label>
					<input
						className={cx('form-control')}
						type='text'
						placeholder='Nhập mã số'
						value={data.id}
						onChange={(e) => {
							setData((prev) => {
								return {
									...prev,
									id: e.target.value
								}
							})
						}}
						onFocus={() => {
							setMessage('');
						}}
					/>
				</div>
				<div className={cx('form-group')}>
					<label className={cx('form-label')}>Loại người</label>
					<div className={cx('form-radios')}>
						<div>
							Sinh viên: <input checked={data.type === 'student'} onChange={() => {
								setData((prev) => {
									return {
										...prev,
										type: 'student'
									}
								})
							}} name="type" type="radio" className={cx('form-radio')} />
						</div>
						<div>
							Thủ thư: <input checked={data.type === 'admin'}
								onChange={() => {
									setData((prev) => {
										return {
											...prev,
											type: 'admin'
										}
									})
								}}
								name="type" type="radio" className={cx('form-radio')} />
						</div>
					</div>
				</div>


				<p className={cx('message', { error: isError })}>{message}</p>
				<button
					className={cx('btn')}
					onClick={handleRegister}
				>
					Đăng ký
				</button>
				<p className={cx('utils')}>
					Bạn đã có tài khoản? Hãy{' '}
					<Link
						className={cx('login')}
						to='/'
					>
						Đăng nhập
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
