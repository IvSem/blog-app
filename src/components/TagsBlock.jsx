import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock/SideBlock';
import { Link } from 'react-router-dom';

export const TagsBlock = ({ items, isLoading = true }) => {
	return (
		<SideBlock title="#Tags">
			<List>
				{items?.map((name, i) => (
					<Link
						key={name}
						style={{
							textDecoration: 'none',
							color: 'black',
							wordBreak: 'break-all',
						}}
						to={`/tags/${name}`}
					>
						<ListItem disablePadding>
							<ListItemButton sx={{ gap: '10px' }}>
								<ListItemIcon sx={{ minWidth: '20px' }}>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</SideBlock>
	);
};
