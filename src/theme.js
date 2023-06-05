import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/user/slice';
import { createTheme } from '@mui/material/styles';

export const Theme = ({ children }) => {
	const mode = useSelector(selectTheme);

	const theme = createTheme({
		palette: {
			mode: mode,
			primary: {
				main: '#4361ee',
			},
			//primary: {
			//	main: '#4361ee',
			//},
		},
		typography: {
			button: {
				textTransform: 'none',
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

	return <ThemeProvider theme={theme}>{children} </ThemeProvider>;
};
