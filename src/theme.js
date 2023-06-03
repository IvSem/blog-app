import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#4361ee',
		},
	},
	typography: {
		button: {
			textTransform: 'none',
			fontWeight: 400,
		},
	},

	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			csb: 700,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});
