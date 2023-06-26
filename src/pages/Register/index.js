import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import images from '@/assets/images';
import * as authenServices from '@/service/authenService';

const cx = classNames.bind(styles);

function Register() {
	const [id, setId] = useState('');
	const [error, setError] = useState('');

	const handleRegister = async () => {
		if (id.length === 8) {
			setError('Vui lòng đợi...');
			const data = await authenServices.register({
				id,
			});

			setError((prev) => {
				if (data.result) {
					return data.msg + 'Kiểm tra email sinh viên để lấy mật khẩu.';
				}
				return data.msg;
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
					<label className={cx('form-label')}>Mã số sinh viên</label>
					<input
						className={cx('form-control')}
						type='text'
						placeholder='Nhập mã số sinh viên'
						value={id}
						onChange={(e) => {
							setId(e.target.value);
						}}
						onFocus={() => {
							setError('');
						}}
					/>
				</div>

				<p className={cx('error')}>{error}</p>
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
						to='/login'
					>
						Đăng nhập
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
