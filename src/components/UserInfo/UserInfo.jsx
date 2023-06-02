import { Avatar } from '@mui/material';
import { stringAvatar } from 'utils/avatar';
import React from 'react';
import styles from './UserInfo.module.scss';
import noAvatar from 'images/noavatar.png';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
	return (
		<div className={styles.root}>
			{avatarUrl ? (
				<img
					className={styles.avatar}
					src={avatarUrl || noAvatar}
					alt={fullName}
				/>
			) : (
				<Avatar {...stringAvatar(fullName)} />
			)}

			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	);
};
