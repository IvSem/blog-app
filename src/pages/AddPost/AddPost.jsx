import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { formatedTags } from 'utils/formatedTagsCreate';
import { createNewPost, getOnePosts, updatePost } from 'services/fetchApi';
import { PostSkeleton } from 'components/Post/Skeleton';

const AddPost = () => {
	const { id: postId } = useParams();
	const navigate = useNavigate();
	const [imageUrl, setImageUrl] = useState('');
	const inputFileRef = useRef(null);
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeFile = async e => {
		try {
			const formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const response = await axios.post('/upload', formData);
			setImageUrl(response.data.url);
		} catch (err) {
			console.warn(err);
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = React.useCallback(value => {
		setText(value);
	}, []);

	useEffect(() => {
		if (postId) {
			setIsLoading(true);
			getOnePosts(postId)
				.then(data => {
					setTitle(data.title);
					setText(data.text);
					setTags(data.tags.toString());
					setImageUrl(data.imageUrl);
				})
				.catch(err => {
					console.warn(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [postId]);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '200px',
			autofocus: true,
			placeholder: 'Enter text...',
			status: false,
			autosave: {
				enabled: true,
				uniqueId: nanoid(),
				delay: 1000,
			},
		}),
		[]
	);

	const onSubmit = async () => {
		try {
			const fields = {
				title,
				text,
				tags: formatedTags(tags),
				imageUrl,
			};
			if (postId) {
				updatePost(postId, fields).then(navigate(`/posts/${postId}`));
			} else {
				createNewPost(fields).then(data => {
					navigate(`/posts/${data._id}`);
				});
			}
		} catch (err) {
			console.warn(err);
			alert('error create article');
		}
	};

	if (isLoading) {
		return <PostSkeleton />;
	}

	return (
		<Paper style={{ padding: 30, marginBottom: 30 }} elevation={6}>
			<Button
				variant="outlined"
				size="large"
				onClick={() => inputFileRef.current.click()}
			>
				Upload a picture
			</Button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant="contained"
						color="error"
						onClick={onClickRemoveImage}
					>
						Delete
					</Button>
					<img
						className={styles.image}
						src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
						alt="Uploaded"
						width={400}
					/>
				</>
			)}
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="The title of the article..."
				value={title}
				onChange={e => {
					setTitle(e.target.value);
				}}
				fullWidth
			/>

			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Specify the tags, separated by commas"
				InputProps={{
					style: {
						'::placeholder': {
							backgroundColor: 'yellow',
							fontWeight: 'bold',
						},
					},
				}}
				value={tags}
				onChange={e => {
					setTags(e.target.value);
				}}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button size="large" variant="contained" onClick={onSubmit}>
					{Boolean(postId) ? 'Save' : 'Submit'}
				</Button>
				<Link to="/">
					<Button size="large">Cancel</Button>
				</Link>
			</div>
		</Paper>
	);
};

export default AddPost;
