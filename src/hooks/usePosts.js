import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	selectAllPosts,
	selectFilterValue,
	selectPostsIsLoading,
} from 'redux/posts/slice';

export const usePosts = () => {
	const isLoading = useSelector(selectPostsIsLoading);
	const posts = useSelector(selectAllPosts);
	const filterValue = useSelector(selectFilterValue);

	function filteredPosts(filterValue, posts) {
		if (filterValue.length > 0) {
			const trimmedFilterValue = filterValue.trim().toLowerCase();
			return posts.filter(post =>
				post.title.toLowerCase().includes(trimmedFilterValue)
			);
		}
		return posts;
	}

	const popularPosts = posts.slice().sort((a, b) => {
		return b.viewsCount - a.viewsCount;
	});

	const filteredNewPosts = useMemo(() => {
		return filteredPosts(filterValue, posts);
	}, [filterValue, posts]);

	const filteredPopularPosts = useMemo(() => {
		return filteredPosts(filterValue, popularPosts);
	}, [filterValue, popularPosts]);

	return {
		posts,
		popularPosts,
		isLoading,
		filterValue,
		filteredNewPosts,
		filteredPopularPosts,
	};
};
