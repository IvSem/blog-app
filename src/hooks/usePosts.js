import { useSelector } from 'react-redux';
import { selectAllPosts, selectPostsIsLoading } from 'redux/posts/slice';

export const usePosts = () => {
	const isLoading = useSelector(selectPostsIsLoading);
	const posts = useSelector(selectAllPosts);

	const popularPosts = posts.slice().sort((a, b) => {
		return b.viewsCount - a.viewsCount;
	});

	return {
		posts,
		popularPosts,
		isLoading,
	};
};
