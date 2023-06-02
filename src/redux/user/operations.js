import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = {
	set(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	},
	unset() {
		axios.defaults.headers.common.Authorization = '';
	},
};

export const logInUser = createAsyncThunk(
	'user/logInUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post('/auth/login', user);
			token.set(response.data.token);
			window.localStorage.setItem('token-user', response.data.token);
			return response.data;
		} catch (err) {
			console.log(err.response.data);
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const signUpUser = createAsyncThunk(
	'user/signUpUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post('/auth/register', user);
			token.set(response.data.token);
			window.localStorage.setItem('token-user', response.data.token);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, { rejectWithValue }) => {
		const tokenLocal = window.localStorage.getItem('token-user');

		if (tokenLocal === null) {
			return rejectWithValue('Unable to fetch user');
		}
		try {
			token.set(tokenLocal);
			const response = await axios.get(`/auth/me`);
			return response.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.message);
		}
	}
);
