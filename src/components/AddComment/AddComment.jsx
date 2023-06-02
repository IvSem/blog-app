import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { stringAvatar } from 'utils/avatar';
import { postCommentCreate } from 'services/fetchApi';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { useAuth } from 'hooks/useAuth';

export const AddComment = ({ avatarUrl, fullName, onClick }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const { id: postId } = useParams();
	const {
		user: { _id },
	} = useAuth();

	const onSubmit = data => {
		alert(JSON.stringify(data, null, 2));
		postCommentCreate(postId, _id, data.content);
		reset();
		setTimeout(() => {
			onClick(true);
		}, 100);
	};

	return (
		<>
			<div className={styles.root}>
				{avatarUrl ? (
					<Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
				) : (
					<Avatar
						classes={{ root: styles.avatar }}
						{...stringAvatar(fullName)}
					/>
				)}
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label="Write a comment"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						error={Boolean(errors.content?.message)}
						{...register('content', {
							required: 'This is required',
							minLength: {
								value: 3,
								message: 'Comment must be at least 3 symbols long',
							},

							maxLength: {
								value: 70,
								message: 'Comment must be at most 70 symbols long',
							},
							pattern: {
								value: /^[^\s]{0,}(?:\s[^\s]{0,}){0,2}$/,
								message: 'Comment must have at most 2 spaces',
							},
						})}
					/>
					<FormHelperText error sx={{ minHeight: '20px', marginBottom: '5px' }}>
						{errors.content?.message}
					</FormHelperText>
					<Button type={'submit'} variant="contained" endIcon={<SendIcon />}>
						Submit
					</Button>
				</form>
			</div>
		</>
	);
};
