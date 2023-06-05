import React from 'react';
import preLoader from 'images/preloader2.gif';
import { Box } from '@mui/material';
export const Loader = () => {
	return (
		<Box
			sx={{
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
				bgcolor: 'background.default',
				color: 'text.primary',
			}}
		>
			<img src={preLoader} alt="preloader" />
		</Box>
	);
};
