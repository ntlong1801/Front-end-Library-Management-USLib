import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '@/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
	return (
		<div className={cx('wrapper')}>
			<p className={cx('date')}>02:00AM 27/06/2023</p>
			<div className={cx('user')}>
				<img
					src={images.logo}
					alt='Logo user'
					className={cx('avatar')}
				/>
				<div className={cx('user-info')}>
					<h3 className={cx('name')}>Nguyen Xuan Quan</h3>
					<p className={cx('role')}>Admin</p>
				</div>
			</div>
			<button className={cx('btn-notify')}>
				<FontAwesomeIcon icon={faBell} />
			</button>
		</div>
	);
}

export default Header;
