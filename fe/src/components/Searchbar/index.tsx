import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.03),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    marginRight: 0,
    marginLeft: 0,
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const SearchWrapper = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'left',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default function SearchBar() {
    return (
        <Search>
            <SearchWrapper>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </SearchWrapper>
        </Search>
    );
}
