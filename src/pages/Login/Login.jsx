import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import {
	Avatar,
	FormHelperText,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from 'redux/user/operations';
import { selectError } from 'redux/user/slice';
import { useNavigate } from 'react-router-dom';
import { useLoading } from 'hooks/useLoading';
import { Loader } from 'components';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const errMessage = useSelector(selectError);
	const [showPassword, setShowPassword] = React.useState(false);
	const { loading, startLoading, stopLoading } = useLoading();
	const handleClickShowPassword = () => setShowPassword(show => !show);
	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		startLoading();
		dispatch(logInUser(data))
			.then(res => {
				if (!res.error) {
					navigate('/');
				}
			})
			.catch(console.log)
			.finally(() => {
				stopLoading();
			});
		reset();
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<Paper classes={{ root: styles.root }} elevation={6}>
			<Avatar
				sx={{
					bgcolor: 'secondary.main',
					margin: '4px auto',
				}}
			>
				<LockOutlinedIcon />
			</Avatar>
			<Typography classes={{ root: styles.title }} variant="h5">
				Sign In
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					autoFocus
					className={styles.field}
					label="E-Mail"
					type="email"
					error={Boolean(errors.email?.message)}
					fullWidth
					{...register('email', {
						required: 'This is required',
						minLength: {
							value: 10,
							message: 'Email must be at least 10 symbols long',
						},

						maxLength: {
							value: 63,
							message: 'Email must be at most 63 symbols long',
						},
						pattern: {
							value:
								/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/i,
							message:
								'Email must contain only Latin letters, may contain digits and/or special symbols',
						},
					})}
				/>
				<FormHelperText error sx={{ minHeight: '20px', marginBottom: '5px' }}>
					{errors.email?.message}
				</FormHelperText>
				<TextField
					className={styles.field}
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
					label="Password"
					error={Boolean(errors.password?.message)}
					fullWidth
					{...register('password', {
						required: 'This is required.',
						minLength: {
							value: 5,
							message: 'Password must be at least 5 characters long',
						},
					})}
				/>
				<FormHelperText error sx={{ minHeight: '20px' }}>
					{errors.password?.message || errMessage}
				</FormHelperText>
				<Button
					sx={{ marginTop: '10px' }}
					type="submit"
					disabled={!isValid}
					size="large"
					variant="contained"
					fullWidth
				>
					Sign in
				</Button>
			</form>
		</Paper>
	);
};

export default Login;
