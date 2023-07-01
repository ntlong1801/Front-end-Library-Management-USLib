import DefaultLayout from '@/layouts/DefaultLayout';
import FrontLayout from '@/layouts/FrontLayout';

import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import SearchPage from '@/pages/Search';
import BookPage from '@/pages/Book';
import Record from '@/pages/Record';
import ReaderPage from '@/pages/Reader';
import RegulationPage from '@/pages/Regulation';
import StudentPage from '@/pages/Student';
import StudentHistoryPage from '@/pages/StudentHistory';
import PageNotFound from '@/pages/PageNotFound';


export const publicRoutes = [
    { path: '/', element: LoginPage, layout: FrontLayout },
    { path: '/register', element: RegisterPage, layout: FrontLayout },
    { path: '*', element: PageNotFound, layout: FrontLayout },
];

export const adminRoutes = [
    { path: '/home', element: SearchPage, layout: DefaultLayout },
    { path: '/book', element: BookPage, layout: DefaultLayout },
    { path: '/record', element: Record, layout: DefaultLayout },
    { path: '/reader', element: ReaderPage, layout: DefaultLayout },
    { path: '/regulation', element: RegulationPage, layout: DefaultLayout },
    { path: '*', element: PageNotFound, layout: FrontLayout },
]

export const studentRoutes = [
    { path: '/home', element: StudentPage, layout: DefaultLayout },
    { path: '/history', element: StudentHistoryPage, layout: DefaultLayout },
    { path: '*', element: PageNotFound, layout: FrontLayout },
]