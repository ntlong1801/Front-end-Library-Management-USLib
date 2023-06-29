import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

import images from '@/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBook,
	faGear,
	faMagnifyingGlass,
	faNotesMedical,
	faRightFromBracket,
	faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const MENU = [
	{
		icon: faMagnifyingGlass,
		title: 'Tìm kiếm',
		to: '/search',
	},
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
		to: 'record',
	},
	{
		icon: faCircleCheck,
		title: 'Quy định',
		to: '/regulation',
	},
];

const AUX_MENU = [
	{
		icon: faGear,
		title: 'Cài đặt',
	},
	{
		icon: faRightFromBracket,
		title: 'Đăng xuất',
	},
];

function Sidebar() {
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

				{MENU.map((item, index) => {
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
				})}
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
