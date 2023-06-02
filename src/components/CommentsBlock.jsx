import React from 'react';

import { SideBlock } from './SideBlock/SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { stringAvatar } from '../utils/avatar';

export const CommentsBlock = ({ items, children, isLoading = true }) => {
	return (
		<SideBlock title="Comments">
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
		</SideBlock>
	);
};
