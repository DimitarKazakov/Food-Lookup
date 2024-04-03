import SearchIcon from '@mui/icons-material/Search';
import { alpha, InputBase, styled } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getAllFood } from '../config/foodApiController';
import { FoodData } from '../pages/api/food';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  marginLeft: 0,
  width: '400px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '400px',
  },
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
  width: '400px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

type SearchFieldProps = {
  setCurrentFoods: Dispatch<SetStateAction<FoodData[]>>;
};

export const SearchField = (props: SearchFieldProps) => {
  const { setCurrentFoods } = props;
  const [foods, setFoods] = useState<FoodData[]>([]);

  useEffect(() => {
    getAllFood().then((resp) => setFoods(resp));
  }, []);
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={(e) => {
          setCurrentFoods(
            foods.filter(
              (x) =>
                x.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                x.description.toLowerCase().includes(e.target.value.toLowerCase()),
            ),
          );
        }}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};
