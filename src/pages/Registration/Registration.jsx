import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Registration.module.scss';
import { useForm } from 'react-hook-form';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from 'redux/user/operations';
import { selectError } from 'redux/user/slice';

const Registration = () => {
	const dispatch = useDispatch();
	const errMsg = useSelector(selectError);
	const [showPassword, setShowPassword] = React.useState(false);
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
		alert(JSON.stringify(data, null, 2));
		dispatch(signUpUser(data));
		reset();
	};

	return (
		<Paper classes={{ root: styles.root }} elevation={6}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Sign up
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Full name"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					{...register('fullName', {
						required: 'This is required',
						minLength: {
							value: 2,
							message: 'Full name must be at least 2 symbols long',
						},

						maxLength: {
							value: 24,
							message: 'Full name must be at most 24 symbols long',
						},
						pattern: {
							value:
								/^(?=.{2,24}$)[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[- '][A-Za-zА-Яа-яІіЇїЄєҐґ]+)*$/i,
							message:
								'Full name must contain only Cyrillic or Latin characters, hyphen and/or space in the middle',
						},
					})}
				/>
				<FormHelperText error sx={{ minHeight: '20px', marginBottom: '5px' }}>
					{errors.fullName?.message}
				</FormHelperText>

				<TextField
					id="email-signup"
					className={styles.field}
					label="E-Mail"
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
					fullWidth
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
					{...register('password', {
						required: 'This is required.',
						minLength: {
							value: 5,
							message: 'Password must be at least 5 characters long',
						},
					})}
				/>
				<FormHelperText error sx={{ minHeight: '20px' }}>
					{errors.p?.message || errMsg}
				</FormHelperText>
				<Button
					type="submit"
					sx={{ marginTop: '10px' }}
					disabled={!isValid}
					size="large"
					variant="contained"
					fullWidth
				>
					Sign up
				</Button>
			</form>
		</Paper>
	);
};


export default Registration