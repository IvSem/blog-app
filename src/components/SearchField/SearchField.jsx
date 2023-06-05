import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { changeFilterValue } from 'redux/posts/slice';
import { usePosts } from 'hooks/usePosts';

const Search = styled('form')(({ theme }) => {
	const bgSearch =
		theme.palette.mode === 'light'
			? alpha(theme.palette.common.black, 0.35)
			: alpha(theme.palette.common.white, 0.35);

	return {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: bgSearch,
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.black, 0.25),
		},
		width: '110px',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: '200px',
		},
	};
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: '0px 5px',
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	color: '#fff',
	justifyContent: 'center',
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(0, 2),
	},
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: '#fff',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: '30px',
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		},
	},
}));

export const SearchField = () => {
	const dispatch = useDispatch();
	const { filterValue } = usePosts();

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				value={filterValue}
				onChange={e => {
					dispatch(changeFilterValue(e.target.value));
				}}
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
			/>
		</Search>
	);
};
