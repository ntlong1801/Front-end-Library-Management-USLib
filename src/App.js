import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, adminRoutes, studentRoutes } from './routes';
import useGlobalContext from './hooks/useGlobalContext';

function App () {
	const [state] = useGlobalContext()

	const renderPrivateRoutes = () => {
		if (state.isLogin) {
			let routes
			if (state.type === 'admin') {
				routes = adminRoutes
			} else if (state.type === 'student') {
				routes = studentRoutes
			}

			return routes.map((item, index) => {
				let Layout;
				let Page;

				//Page doesn't have layout
				if (item.layout === undefined) {
					Layout = Fragment;
				} else if (item.layout) {
					Layout = item.layout;
				}

				Page = item.element;
				return (
					<Route
						key={index}
						path={item.path}
						element={
							<Layout>
								<Page />
							</Layout>
						}
					/>
				);
			})
		}
	}

	return (
		<Router>
			<div id='App'>
				<Routes>
					{publicRoutes.map((item, index) => {
						let Layout;
						let Page;

						//Page doesn't have layout
						if (item.layout === undefined) {
							Layout = Fragment;
						} else if (item.layout) {
							Layout = item.layout;
						}

						Page = item.element;
						return (
							<Route
								key={index}
								path={item.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}

					{
						renderPrivateRoutes()
					}

				</Routes>
			</div>
		</Router>
	);
}

export default App;
