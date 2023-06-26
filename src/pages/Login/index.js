import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';
import images from '@/assets/images';
import * as authenServices from '@/service/authenService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);

	const navigator = useNavigate();

	const handleLogin = async () => {
		if (id.length === 8) {
			setIsError(false);
			setMessage('Đang đăng nhập...');
			const data = await authenServices.login({
				id,
				password,
			});

			if (!data.result) {
				setIsError(true);
				setMessage(data.msg);
			} else {
				localStorage.setItem('refresh_token', data.refreshToken);

				navigator('/');
			}
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

				<h2 className={cx('heading')}>Đăng nhập</h2>
				<p className={cx('des')}>Chúc bạn trãi nghiệm hệ thống thư viện USLib</p>
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
							setMessage('');
						}}
					/>
				</div>
				<div className={cx('form-group')}>
					<label className={cx('form-label')}>Mật khẩu</label>
					<input
						className={cx('form-control')}
						type='password'
						placeholder='Nhập mật khẩu'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						onFocus={() => {
							setMessage('');
						}}
					/>
				</div>
				<p className={cx('message', { error: isError })}>{message}</p>
				<button
					className={cx('btn')}
					onClick={handleLogin}
				>
					Đăng nhập
				</button>
				<p className={cx('utils')}>
					Bạn chưa có tài khoản? Hãy{' '}
					<Link
						className={cx('login')}
						to='/register'
					>
						Đăng ký
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
