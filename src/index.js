import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from './theme';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<CssBaseline />
		<Provider store={store}>
			<Theme>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Theme>
		</Provider>
	</>
);
