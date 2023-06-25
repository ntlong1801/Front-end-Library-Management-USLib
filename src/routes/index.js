import DefaultLayout from '@/layouts/DefaultLayout';
import FrontLayout from '@/layouts/FrontLayout';

import LoginPage from '@/pages/Login';
import HomePage from '@/pages/Home';

export const publicRoutes = [
	{ path: '/login', element: LoginPage, layout: FrontLayout },
	{ path: '/', element: HomePage, layout: DefaultLayout },
];
