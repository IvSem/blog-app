import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post, SearchField, TagsBlock } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from 'redux/posts/operations';
import { selectAllTags } from 'redux/posts/slice';
import * as muiTab from 'utils/muiTab';
import Box from '@mui/material/Box';
import { useAuth } from 'hooks/useAuth';
import { usePosts } from 'hooks/usePosts';
import { CustomSwitch } from 'components/CustomSwitch/CustomSwitch';
import { PostSkeleton } from 'components/Post/Skeleton';

const Home = () => {
	const [valueTab, setValueTab] = useState(0);
	const dispatch = useDispatch();
	const tags = useSelector(selectAllTags);
	const { user: userData } = useAuth();
	const { isLoading, filteredNewPosts, filteredPopularPosts, filterValue } =
		usePosts();

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, [dispatch]);

	const handleChangeTab = (event, newValue) => {
		setValueTab(newValue);
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						marginBottom: '15px',
						display: 'flex',
						alignItems: 'center',
						position: 'relative',
					}}
				>
					<Tabs
						sx={{ flexGrow: 1 }}
						value={valueTab}
						onChange={handleChangeTab}
						aria-label="basic tabs example"
					>
						<Tab label="New Posts" {...muiTab.a11yProps(0)} />
						<Tab label="Popular" {...muiTab.a11yProps(1)} />
					</Tabs>
					<Box
						sx={{
							display: { xs: 'flex', sm: 'none', justifyContent: 'flex-end' },
						}}
					>
						<SearchField />
					</Box>
					<Box
						sx={{
							display: { xs: 'none', sm: 'block' },
							position: 'absolute',
							top: 0,
							right: -25,
						}}
					>
						<CustomSwitch />
					</Box>
				</Box>

				<muiTab.TabPanel value={valueTab} index={0}>
					<Grid container spacing={4}>
						{isLoading ? (
							<Grid xs={12} sm={8} item>
								<PostSkeleton />
							</Grid>
						) : (
							<Grid xs={12} sm={8} item>
								{filteredNewPosts?.map(post => (
									<Post
										key={post._id}
										id={post._id}
										title={post.title}
										imageUrl={post.imageUrl}
										user={{
											avatarUrl: post.user.avatarUrl,
											fullName: post.user.fullName,
										}}
										createdAt={post.createdAt}
										viewsCount={post.viewsCount}
										commentsCount={post.comments.length}
										tags={tags}
										isEditable={userData?._id === post.user?._id}
									/>
								))}
							</Grid>
						)}
						<Grid sm={4} item>
							<TagsBlock items={tags} isLoading={isLoading} />
						</Grid>
					</Grid>
				</muiTab.TabPanel>

				<muiTab.TabPanel value={valueTab} index={1}>
					<Grid container spacing={4}>
						{isLoading ? (
							<Grid xs={12} sm={8} item>
								<PostSkeleton />
							</Grid>
						) : (
							<Grid xs={12} sm={8} item>
								{filteredPopularPosts.length === 0 && (
									<p>No post with that {filterValue}</p>
								)}
								{filteredPopularPosts?.map(
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
										<Post
											key={_id}
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
											isEditable={userData?._id === user?._id}
										/>
									)
								)}
							</Grid>
						)}
						<Grid sm={4} item>
							<TagsBlock items={tags} isLoading={isLoading} />
						</Grid>
					</Grid>
				</muiTab.TabPanel>
			</Box>
		</>
	);
};

export default Home;
