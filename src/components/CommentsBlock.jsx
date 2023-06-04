import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { stringAvatar } from '../utils/avatar';
import { Paper, Typography } from '@mui/material';

export const CommentsBlock = ({ items, children, isLoading = true, title }) => {
	return (
		<Paper sx={{ display: { xs: 'block', sm: 'block' } }}>
			<Typography variant="h6">{title}</Typography>

			<List>
				{items.map((el, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : el.author.avatarUrl ? (
									<Avatar
										alt={el?.author.fullName}
										src={el?.author.avatarUrl}
									/>
								) : (
									<Avatar {...stringAvatar(el?.author.fullName)} />
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<ListItemText
									primary={el?.author.fullName}
									secondary={el?.content}
								/>
							)}
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
			{children}
		</Paper>
	);
};
