import { AddComment, CommentsBlock, Post } from 'components';
import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser } from 'redux/user/slice';
import { getOnePosts } from 'services/fetchApi';

const FullPost = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	console.log(':>  FullPost  isLoading:', isLoading);
	const userData = useSelector(selectUser);

	const handleChangeIsLoading = value => {
		if (value) {
			setIsLoading(true);
			getOnePosts(id)
				.then(data => {
					setData(data);
					setIsLoading(false);
				})
				.catch(err => {
					console.warn(err);
				});
		}
	};

	const { id } = useParams();

	useEffect(() => {
		getOnePosts(id)
			.then(data => {
				setData(data);
				setIsLoading(false);
			})
			.catch(err => {
				console.warn(err);
			});
	}, [id]);

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />;
	}

	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				imageUrl={data.imageUrl}
				user={{
					avatarUrl: data.user.avatarUrl,
					fullName: data.user.fullName,
				}}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.comments?.length}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />
			</Post>

			<CommentsBlock items={data.comments} isLoading={isLoading}>
				<AddComment
					avatarUrl={userData?.avatarUrl}
					fullName={userData?.fullName}
					onClick={handleChangeIsLoading}
				/>
			</CommentsBlock>
		</>
	);
};

export default FullPost;
