import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';

function App() {
	return (
		<Router>
			<div className='App'>
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
				</Routes>
			</div>
		</Router>
	);
}

export default App;
