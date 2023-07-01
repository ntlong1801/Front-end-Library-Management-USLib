import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faLock } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';

import images from '@/assets/images';
import Popper from '@/components/Popper';
import Button from '@/components/Button';
import * as authenService from '@/service/authenService'
import toastOption from '@/utils/toastOption';
import useGlobalContext from '@/hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom';
import { viewRequest } from '@/service/readerService'

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
const MENU = [
	{
		icon: <FontAwesomeIcon icon={faLock} />,
		title: 'Thay đổi mật khẩu',
		type: 'CHANGE_PASSWORD'
	}
]
Modal.setAppElement('#root')

function Header () {
	const navigate = useNavigate();
	const [showNotifications, setShowNotifications] = useState(false)
	const [notifications, setNotifications] = useState([])

	async function fetchData () {
		const data = await viewRequest();
		if (data.result === true) {
			setNotifications(data.request)
		}
		else {
			setNotifications([])
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	const handleViewDetail = () => {
		setShowNotifications(false);

		navigate('/reader');
	}

	const [state] = useGlobalContext()
	const [time, setTime] = useState(new Date())
	const [modalIsOpen, setIsOpen] = useState(false);

	const [password, setPassword] = useState({
		old: '',
		new: '',
		reNew: ''
	})

	useEffect(() => {
		const id = setInterval(() => {
			setTime(new Date())
		}, 1000)

		return () => clearInterval(id)
	}, [])

	const handleChangePassword = async () => {
		if (password.new === password.reNew) {
			const id = state.id
			const res = await authenService.changePassword({
				id,
				current_password: password.old,
				new_password: password.new
			})
			if (res.result) {
				toast.success(res.msg, toastOption)
				setIsOpen(false)
			} else {
				toast.error(res.msg, toastOption)
			}
		} else {
			toast.error('Mật khẩu không trùng khớp', toastOption)
		}
	}


	const handleMenu = (type) => {
		switch (type) {
			case 'CHANGE_PASSWORD':
				setIsOpen(true);
				break;
			default:

		}
	}



	return (
		<div className={cx('wrapper')}>
			<p className={cx('date')}>{time.toLocaleTimeString()} {time.toLocaleDateString()}</p>
			<div className={cx('user')}>
				<img
					src={images.logo}
					alt='Logo user'
					className={cx('avatar')}
				/>
				<Tippy
					interactive
					placement='bottom-end'
					offset={[8, 10]}
					render={attrs => <div {...attrs}>
						<Popper className={cx('user-actions')}>
							{
								MENU.map((item, index) => {
									return <div key={index} className={cx('user-action-item')} onClick={() => handleMenu(item.type)}>
										<span className={cx('user-action-icon')}>
											{item.icon}
										</span>
										<p className={cx('user-action-title')}>{item.title}</p>
									</div>
								})
							}
						</Popper>
					</div>}
				>
					<div className={cx('user-info')}>
						<h3 className={cx('name')}>{state.info.name}</h3>
						<p className={cx('role')}>{state.type}</p>
					</div>
				</Tippy>
			</div>
			<Tippy
				placement='bottom'
				visible={showNotifications}
				interactive
				render={attrs => (
					<div className={cx('box')} tabIndex="-1" {...attrs}>
						<Popper>
							<p className={cx('m-8')}>Có {notifications.length} yêu cầu lập thẻ độc giả</p>
							<Button className={cx('center')} onClick={handleViewDetail}>Xem chi tiết</Button>
						</Popper>
					</div>

				)}
				onClickOutside={() => setShowNotifications(false)}
			>
				<button className={cx('btn-notify')} onClick={() => setShowNotifications(true)}>
					<FontAwesomeIcon icon={faBell} />
				</button>
			</Tippy>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setIsOpen(false)}
				style={customStyles}
				overlayClassName={cx('modal-overlay')}
			>
				<div className={cx('modal')}>

					<h3 className={cx('modal-heading')}>Thay đổi mật khẩu</h3>
					<div className={cx('modal-form')}>
						<div className={cx('form-group')}>
							<label className={cx('form-label')} htmlFor='old-password'>Mật khẩu cũ</label>
							<input id='old-passowrd' type="password" className={cx('form-control')} value={password.old} onChange={(e) => {
								setPassword(prev => {
									return {
										...prev,
										old: e.target.value
									}
								})
							}} />
						</div>
						<div className={cx('form-group')}>
							<label className={cx('form-label')} htmlFor='old-password'>Mật khẩu mới</label>
							<input id='old-passowrd' type="password" className={cx('form-control')} value={password.new} onChange={(e) => {
								setPassword(prev => {
									return {
										...prev,
										new: e.target.value
									}
								})
							}} />
						</div>
						<div className={cx('form-group')}>
							<label className={cx('form-label')} htmlFor='old-password'>Nhập lại mật khẩu mới</label>
							<input id='old-passowrd' type="password" className={cx('form-control')} value={password.reNew} onChange={(e) => {
								setPassword(prev => {
									return {
										...prev,
										reNew: e.target.value
									}
								})
							}} />
						</div>
					</div>

					<div className={cx('modal-actions')}>
						<Button onClick={handleChangePassword}>Thay đổi</Button>
						<Button onClick={() => setIsOpen(false)}>Đóng</Button>
					</div>

				</div>
			</Modal>

			<ToastContainer />

		</div>
	);
}


export default Header;
