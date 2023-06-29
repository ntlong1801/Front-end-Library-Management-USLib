import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Image.module.scss';

import images from '@/assets/images';
const cx = classNames.bind(styles);

function Image({ src, alt, fallback = images.logo, className, ...props }) {
	const classes = cx('wrapper', {
		[className]: className,
	});

	const _props = {
		...props,
	};

	const [_fallback, set_FallBack] = useState(src);
	return (
		<img
			className={classes}
			src={_fallback}
			alt={alt}
			onError={() => {
				set_FallBack(fallback);
			}}
			{..._props}
		/>
	);
}

export default Image;
