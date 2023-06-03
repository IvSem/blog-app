import React from 'react';
import preLoader from 'images/preloader2.gif';
export const Loader = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 10,
			}}
		>
			<img src={preLoader} alt="preloader" />
		</div>
	);
};
