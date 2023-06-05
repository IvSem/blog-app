import { configureStore } from '@reduxjs/toolkit';
import { postsSlice } from './posts/slice';
import { userSlice } from './user/slice';

const store = configureStore({
	reducer: {
		posts: postsSlice.reducer,
		user: userSlice.reducer,
	},
});

export default store;
