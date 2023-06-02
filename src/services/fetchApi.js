import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getPosts = async () => {
	try {
		const response = await axios.get('/posts');
		return response.data;
	} catch (err) {
		console.error('getPosts error', err);
	}
};

export const getOnePosts = async id => {
	try {
		const response = await axios.get(`/posts/${id}`);
		return response.data;
	} catch (err) {
		console.error('getPosts error', err);
	}
};

export const postCommentCreate = async (id, authorId, content) => {
	try {
		const response = await axios.post(`/posts/${id}/comments`, {
			authorId,
			content,
		});
		return response.data;
	} catch (err) {
		console.error('getPosts error', err);
	}
};

export const createNewPost = async post => {
	try {
		const response = await axios.post(`/posts`, post);
		return response.data;
	} catch (err) {
		console.warn('createNewPost ERR', err);
		alert('added post error!');
	}
};
export const updatePost = async (id, updatedPost) => {
	try {
		const response = await axios.patch(`/posts/${id}/edit`, updatedPost);
		console.log(response);
		return response.data;
	} catch (err) {
		console.warn('createNewPost ERR', err);
	}
};
export const getPostsByTag = async tag => {
	try {
		const response = await axios.get(`/tags/${tag}`);
		return response.data;
	} catch (err) {
		console.error(err);
	}
};
