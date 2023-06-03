import { ArrowBack } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Post } from 'components';
import { PostSkeleton } from 'components/Post/Skeleton';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostsByTag } from 'services/fetchApi';

const Tags = () => {
	const { name: tag } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (tag) {
			setIsLoading(true);
			getPostsByTag(tag)
				.then(data => {
					setData(data);
				})
				.catch(err => {
					alert('Error getPostsByTag');
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [tag]);

	if (isLoading) {
		return <PostSkeleton />;
	}

	return (
		<>
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
			<Grid container spacing={4}>
				{data?.map(
					({
						_id,
						title,
						imageUrl,
						user,
						createdAt,
						viewsCount,
						comments,
						tags,
					}) => (
						<Grid
							key={_id}
							item
							xs={12}
							sm={12}
							md={data.length === 1 ? 12 : 6}
							lg={data.length === 1 ? 12 : 6}
						>
							<Post
								id={_id}
								title={title}
								imageUrl={imageUrl}
								user={{
									avatarUrl: user.avatarUrl,
									fullName: user.fullName,
								}}
								createdAt={createdAt}
								viewsCount={viewsCount}
								commentsCount={comments.length}
								tags={tags}
								isLoading={false}
							/>
						</Grid>
					)
				)}
			</Grid>
		</>
	);
};

export default Tags;
