import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/posts');
			return response.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err);
		}
	}
);

export const fetchTags = createAsyncThunk(
	'posts/fetchTags',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/posts/tags');
			return response.data;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err);
		}
	}
);

export const fetchDeletePost = createAsyncThunk(
	'posts/fetchDeletePosts',
	async (id, { rejectWithValue }) => {
		try {
			await axios.delete(`/posts/${id}`);
		} catch (err) {
			console.log(err);
			return rejectWithValue(err);
		}
	}
);
