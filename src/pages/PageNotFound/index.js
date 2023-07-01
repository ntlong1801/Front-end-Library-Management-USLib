import classNames from 'classnames/bind';
import styles from './PageNotFound.module.scss';
import images from '@/assets/images';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function PageNotFound () {

	return (
		<div className={cx('wrapper')}>
			<img src={images.pageNotFound} alt="Page not found" />
			<Button to={"/"} className={cx('btn-back')}>
				Quay lại Đăng nhập
			</Button>
		</div>
	);
}

export default PageNotFound;
