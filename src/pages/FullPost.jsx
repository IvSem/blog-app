import { ArrowBack } from '@mui/icons-material';
import { AddComment, CommentsBlock, Post } from 'components';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/user/slice';
import { getOnePosts } from 'services/fetchApi';
import { Box } from '@mui/system';
import { CustomSwitch } from 'components/CustomSwitch/CustomSwitch';

const FullPost = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const userData = useSelector(selectUser);
	const navigate = useNavigate();

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
	if (!data) {
		return <p> Error server</p>;
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					position: 'relative',
				}}
			>
				<Button
					variant="contained"
					sx={{
						backgroundImage: 'linear-gradient(to right, #baf29c, #193f67)',
						color: '#fff',
						'&:hover': {
							color: '#ffb1f1',
							'& .MuiSvgIcon-root': {
								color: '#9bff5c',
								transition: 'all 0.3s ease-in-out',
							},
							boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
							transition: 'all 0.3s ease-in-out',
						},
						marginBottom: '10px',
					}}
					startIcon={<ArrowBack />}
					onClick={() => {
						navigate(-1);
					}}
				>
					Go Back
				</Button>
				<Box
					sx={{
						display: { xs: 'none', sm: 'block' },
						position: 'absolute',
						top: -5,
						right: -27,
					}}
				>
					<CustomSwitch />
				</Box>
			</Box>
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

			<CommentsBlock
				items={data.comments}
				isLoading={isLoading}
				title="Comments"
			>
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
