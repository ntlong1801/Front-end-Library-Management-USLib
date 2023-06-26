import classNames from 'classnames/bind';
import styles from './FrontLayout.module.scss';

const cx = classNames.bind(styles);

function FrontLayout({ children }) {
	return <div className={cx('wrapper')}>{children}</div>;
}

export default FrontLayout;
