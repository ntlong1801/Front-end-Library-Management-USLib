import DefaultLayout from '@/layouts/DefaultLayout';
import FrontLayout from '@/layouts/FrontLayout';

import LoginPage from '@/pages/Login';
import HomePage from '@/pages/Home';
import RegisterPage from '@/pages/Register';
import MakingLoanPage from '@/pages/MakingLoan';

export const publicRoutes = [
	{ path: '/login', element: LoginPage, layout: FrontLayout },
	{ path: '/register', element: RegisterPage, layout: FrontLayout },
	{ path: '/', element: HomePage, layout: DefaultLayout },
	{ path: '/makingloan', element: MakingLoanPage, layout: DefaultLayout },
];
