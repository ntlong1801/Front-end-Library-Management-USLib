import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import CryptoJS from 'crypto-js';

import styles from './Login.module.scss';
import images from '@/assets/images';
import * as authenServices from '@/service/authenService';
import useGlobalContext from '@/hooks/useGlobalContext';

const cx = classNames.bind(styles);

function Login () {
	const [state, setState] = useGlobalContext()
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
				var ciphertext = CryptoJS.AES.encrypt(data.refreshToken, process.env.REACT_APP_ENCRYPT_SECRET_KEY).toString();

				setState(prev => {
					return {
						id: id,
						isLogin: true,
						type: data.type
					}
				})

				localStorage.setItem('refresh_token', ciphertext);
				navigator('/home');
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
					<label className={cx('form-label')}>Mã số người dùng</label>
					<input
						className={cx('form-control')}
						type='text'
						placeholder='Nhập mã số'
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
