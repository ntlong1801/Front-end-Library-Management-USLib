function FrontLayout({ children }) {
	return (
		<div>
			<h1>Header</h1>
			<div className='container'>{children}</div>
			<h1>Footer</h1>
		</div>
	);
}

export default FrontLayout;
