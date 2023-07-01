import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBook,
	faGear,
	faMagnifyingGlass,
	faNotesMedical,
	faRightFromBracket,
	faCircleCheck,
	faHome,
	faHistory
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import CryptoJS from 'crypto-js';

import styles from './Sidebar.module.scss';
import images from '@/assets/images';
import * as authenService from '@/service/authenService'
import useGlobalContext from '@/hooks/useGlobalContext';

const cx = classNames.bind(styles);

const GENERAL_MENU = [
	{
		icon: faHome,
		title: 'Trang chủ',
		to: '/home',
	},
]

const ADMIN_MENU = [
	...GENERAL_MENU,
	{
		icon: faBook,
		title: 'Quản lý sách',
		to: '/book',
	},
	{
		icon: faUser,
		title: 'Quản lý độc giả',
		to: '/reader',
	},
	{
		icon: faNotesMedical,
		title: 'Lập phiếu mượn-trả sách',
		to: '/record',
	},
	{
		icon: faCircleCheck,
		title: 'Quy định',
		to: '/regulation',
	},
];

const STUDENT_MENU = [
	...GENERAL_MENU,
	{
		icon: faHistory,
		title: 'Lịch sử mượn',
		to: '/history',
	},
]

const AUX_MENU = [
	{
		icon: faGear,
		title: 'Cài đặt',
		type: 'SETTING'
	},
	{
		icon: faRightFromBracket,
		title: 'Đăng xuất',
		type: 'LOG_OUT'
	},
];



function Sidebar () {
	const navigator = useNavigate()
	const [state] = useGlobalContext()

	const renderMenu = () => {
		let menuList
		if (state.type === 'admin') {
			menuList = ADMIN_MENU
		} else if (state.type === 'student') {
			menuList = STUDENT_MENU
		}

		return menuList.map((item, index) => {
			return (
				<li
					className={cx('menu-item')}
					key={index}
				>
					<Link
						to={item.to}
						className={cx('menu-link')}
					>
						<FontAwesomeIcon
							className={cx('menu-icon')}
							icon={item.icon}
						/>
						{item.title}
					</Link>
				</li>
			);
		})
	}

	const handleMenu = async (type) => {
		switch (type) {
			case 'LOG_OUT':
				var ciphertext = localStorage.getItem('refresh_token')
				var bytes = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_ENCRYPT_SECRET_KEY);
				var refreshToken = bytes.toString(CryptoJS.enc.Utf8);

				const res = await authenService.logOut({
					refresh_token: refreshToken
				})

				if (res.result) {
					localStorage.removeItem('refresh_token')
					localStorage.removeItem('id')
					navigator('/')
				}

				break;
			default:
		}
	}

	return (
		<div className={cx('wrapper')}>
			<div className={cx('logo')}>
				<img
					src={images.logo}
					alt='Logo uslib'
				/>
			</div>
			<ul className={cx('menu-list')}>
				<h2 className={cx('menu-heading')}>Main Menu</h2>

				{renderMenu()}
			</ul>

			<ul className={cx('menu-list', 'mt-auto')}>
				<h2 className={cx('menu-heading')}>Hỗ trợ</h2>

				{AUX_MENU.map((item, index) => {
					return (
						<li
							className={cx('menu-item')}
							key={index}
						>
							<Link
								to={item.to}
								className={cx('menu-link')}
								onClick={() => handleMenu(item.type)}
							>
								<FontAwesomeIcon
									className={cx('menu-icon')}
									icon={item.icon}
								/>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Sidebar;
