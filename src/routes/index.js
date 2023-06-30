import DefaultLayout from '@/layouts/DefaultLayout';
import FrontLayout from '@/layouts/FrontLayout';

import LoginPage from '@/pages/Login';
import HomePage from '@/pages/Home';
import RegisterPage from '@/pages/Register';
import SearchPage from '@/pages/Search';
import BookPage from '@/pages/Book';
import MakingLoanPage from '@/pages/MakingLoan';
import ReaderPage from '@/pages/Reader';
import RegulationPage from '@/pages/Regulation';
import StudentPage from '@/pages/Student';
import StudentHistoryPage from '@/pages/StudentHistory';

export const publicRoutes = [
	{ path: '/login', element: LoginPage, layout: FrontLayout },
	{ path: '/register', element: RegisterPage, layout: FrontLayout },
	{ path: '/search', element: SearchPage, layout: DefaultLayout },
	{ path: '/book', element: BookPage, layout: DefaultLayout },
	{ path: '/', element: HomePage, layout: DefaultLayout },
	{ path: '/makingloan', element: MakingLoanPage, layout: DefaultLayout },
	{ path: '/reader', element: ReaderPage, layout: DefaultLayout },
	{ path: '/regulation', element: RegulationPage, layout: DefaultLayout },
	{ path: '/student', element: StudentPage, layout: DefaultLayout },
	{ path: '/student_history', element: StudentHistoryPage, layout: DefaultLayout },
];
