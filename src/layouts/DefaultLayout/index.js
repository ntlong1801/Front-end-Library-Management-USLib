import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useGlobalContext from '@/hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout ({ children }) {
	const [state] = useGlobalContext()
	const [isLogged, setIsLogged] = useState(false)

	const navigator = useNavigate()

	useEffect(() => {
		if (!state.isLogin) navigator('/login')
		else setIsLogged(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const renderUI = () => {
		if (isLogged) {
			return <div className={cx('wrapper')}>
				< Sidebar />
				<div className={cx('container')}>
					<Header />
					<div className={cx('content')}>{children}</div>
				</div>
			</div >
		}
		return null;
	}


	return (
		<Fragment>
			{renderUI()}
		</Fragment>

	)
}

export default DefaultLayout;
