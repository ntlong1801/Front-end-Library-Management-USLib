import classNames from 'classnames/bind';

import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

function Button({ href, to, children, active, disabled, onClick, className, ...props }, ref) {
	let Com;

	const _props = {
		...props,
		onClick,
	};

	const classes = cx('btn', {
		active: active,
		disabled: disabled,
		[className]: className,
	});

	if (href) {
		Com = 'a';
	} else if (to) {
		Com = Link;
	} else {
		Com = 'button';
	}

	if (disabled) {
		Object.keys(_props).forEach((key) => {
			if (typeof _props[key] === 'function' && key.startsWith('on')) {
				delete _props.key;
			}
		});
	}

	return (
		<Com
			ref={ref}
			{..._props}
			className={classes}
		>
			{children}
		</Com>
	);
}

export default forwardRef(Button);
