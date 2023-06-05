import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatedTags } from 'utils/formatedTagsCreate';
import { createNewPost, getOnePosts, updatePost } from 'services/fetchApi';
import { PostSkeleton } from 'components/Post/Skeleton';
import { Box } from '@mui/material';
import { CustomSwitch } from 'components/CustomSwitch/CustomSwitch';
import { ArrowBack } from '@mui/icons-material';

const AddPost = () => {
	const { id: postId } = useParams();
	const navigate = useNavigate();
	const [imageUrl, setImageUrl] = useState('');
	const inputFileRef = useRef(null);
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	//const handleChangeFile = async e => {
	//	try {
	//		const formData = new FormData();
	//		const file = e.target.files[0];
	//		formData.append('image', file);
	//		const response = await axios.post('/upload', formData);
	//		console.log(':>  handleChangeFile  response:', response);
	//		setImageUrl(response.data.fileData);
	//	} catch (err) {
	//		alert('Error with upload files,try again later');
	//		console.warn(err);
	//	}
	//};
	const handleChangeFile = async e => {
		const file = e.target.files[0];
		const maxSizeInBytes = 1 * 1024 * 1024; // 5 MB

		if (file.size > maxSizeInBytes) {
			alert('Розмір файлу перевищує максимальний допустимий розмір, 1 мб');
			e.target.value = null;
			return;
		}

		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
		}
		reader.onload = () => {
			setImageUrl(reader.result);
		};
		reader.onerror = err => {
			alert('Error convert image to Base64');
			console.warn('Error', err);
		};
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
		<Box sx={{ pb: 2 }}>
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
			<Paper
				sx={{
					padding: { xs: '10px', sm: '15px', md: '30px' },
				}}
				elevation={6}
			>
				<Button
					variant="outlined"
					color="primary"
					size="large"
					sx={{ fontWeight: 900, mr: 1 }}
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
							src={imageUrl}
							//src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
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
						<Button size="large" variant="outlined" color="warning">
							Cancel
						</Button>
					</Link>
				</div>
			</Paper>
		</Box>
	);
};

export default AddPost;
