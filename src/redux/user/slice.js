import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchUser, logInUser, signUpUser } from './operations';

const savedThemeMode = localStorage.getItem('myAppDataTheme');
const themeMode = savedThemeMode ? JSON.parse(savedThemeMode) : 'light';

const initialState = {
	user: null,
	isLoading: false,
	isLoggedIn: false,
	isRefreshing: false,
	error: null,
	theme: themeMode,
};
const handlePending = state => {
	state.isLoading = true;
	state.error = null;
};

const handleAuthFullfield = (state, { payload }) => {
	const { token, ...rest } = payload;
	state.user = rest;
	state.isLoggedIn = true;
	state.isLoading = false;
	state.isRefreshing = false;
	state.error = null;
};

const handleRejected = (state, { payload }) => {
	if (payload) {
		state.error = payload;
	}
	state.isLoading = false;
	state.isRefreshing = false;
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logOut: state => {
			window.localStorage.removeItem('token-user');
			state.user = null;
			state.isLoggedIn = false;
			state.isRefreshing = false;
		},
		changeTheme: (state, action) => {
			state.theme = action.payload;
			window.localStorage.setItem(
				'myAppDataTheme',
				JSON.stringify(action.payload)
			);
		},
	},
	extraReducers: builder => {
		builder.addCase(signUpUser.fulfilled, handleAuthFullfield);
		builder.addCase(logInUser.fulfilled, handleAuthFullfield);
		builder.addCase(fetchUser.fulfilled, handleAuthFullfield);
		builder.addCase(signUpUser.pending, handlePending);
		builder.addCase(logInUser.pending, handlePending);
		builder.addCase(fetchUser.pending, state => {
			state.isRefreshing = true;
		});
		builder.addCase(signUpUser.rejected, handleRejected);
		builder.addCase(logInUser.rejected, handleRejected);
		builder.addCase(fetchUser.rejected, state => {
			window.localStorage.removeItem('token-user');
			state.user = null;
			state.isLoggedIn = false;
			state.isRefreshing = false;
		});
	},
});

export const selectUser = state => {
	return state.user.user;
};
export const memoizedSelectUser = createSelector(selectUser, user => {
	return user;
});
export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectIsRefreshing = state => state.user.isRefreshing;
export const selectError = state => state.user.error;
export const selectIsLoading = state => state.user.isLoading;
export const selectTheme = state => state.user.theme;

export const { logOut, changeTheme } = userSlice.actions;
