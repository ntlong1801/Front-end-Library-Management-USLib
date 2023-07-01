import classNames from 'classnames/bind';

import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

function Button ({ href, to, children, active, warning, success, disabled, isIcon, onClick, className, ...props }, ref) {
	let Com;

	const _props = {
		...props,
		onClick,
	};

	const classes = cx('btn', {
		"is-icon": isIcon,
		active: active,
		warning: warning,
		success: success,
		disabled: disabled,
		[className]: className,
	});

	if (href) {
		Com = 'a';
		_props.href = href
	} else if (to) {
		Com = Link;
		_props.to = to
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
