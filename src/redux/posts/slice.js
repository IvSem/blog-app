import { createSlice } from '@reduxjs/toolkit';
import { fetchDeletePost, fetchPosts, fetchTags } from './operations';

const initialState = {
	posts: {
		items: [],
		isLoading: false,
	},
	tags: {
		items: [],
	},
};

const handlePending = state => {
	state.posts.isLoading = true;
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducer: {},
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, handlePending);
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts.items = action.payload;
			state.posts.isLoading = false;
		});
		builder.addCase(fetchTags.fulfilled, (state, action) => {
			state.tags.items = action.payload;
			state.posts.isLoading = false;
		});
		builder.addCase(fetchPosts.rejected, state => {
			state.posts.isLoading = false;
		});
		builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
			state.posts.items = state.posts.items.filter(
				el => el._id !== action.meta.arg
			);
		});
	},
});

export const selectPostsIsLoading = state => state.posts.posts.isLoading;
export const selectAllPosts = state => state.posts.posts.items;
export const selectAllTags = state => state.posts.tags.items;
