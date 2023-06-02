import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchUser, logInUser, signUpUser } from './operations';

const initialState = {
	user: null,
	isLoading: false,
	isLoggedIn: false,
	isRefreshing: false,
	error: null,
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
	console.log('Error Auth ', payload);
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

export const { logOut } = userSlice.actions;
