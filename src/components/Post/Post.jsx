import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import defaultImg from 'images/noavatar.png';
import { convertedData } from 'utils/convertedData';
import { useDispatch } from 'react-redux';
import { fetchDeletePost } from 'redux/posts/operations';

export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	const dispatch = useDispatch();

	const onClickRemove = () => {
		dispatch(fetchDeletePost(id));
	};

	if (isLoading) {
		return <PostSkeleton />;
	}

	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="error">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl ? (
				<Link to={`/posts/${id}`} className={styles.linkImage}>
					<img
						className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
						loading="lazy"
						src={imageUrl}
						//src={
						//	checkLink(imageUrl)
						//		? imageUrl
						//		: `${process.env.REACT_APP_API_URL}${imageUrl}`
						//}
						alt={title}
					/>
				</Link>
			) : (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={defaultImg}
					alt={title}
					loading="lazy"
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={convertedData(createdAt)} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags?.map(name => (
							<li key={name}>
								<Link to={`/tags/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
