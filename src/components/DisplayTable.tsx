import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { FoodData } from '../pages/api/food';

type DisplayTableProps = {
  selectedFoods: FoodData[];
};
export const DisplayTable = (props: DisplayTableProps) => {
  const { selectedFoods } = props;

  return (
    <TableContainer sx={{ marginRight: '100px', marginLeft: '100px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Food</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fats</TableCell>
            <TableCell align="right">Carbohydrates</TableCell>
            <TableCell align="right">Protein</TableCell>
            <TableCell align="right">Price per unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedFoods.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.kcal}</TableCell>
              <TableCell align="right">{row.fats}</TableCell>
              <TableCell align="right">{row.carbohydrates}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.pricePerUnit} лв.</TableCell>
            </TableRow>
          ))}

          {selectedFoods.length > 0 && (
            <TableRow key={nanoid()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell align="right">
                {selectedFoods.map((x) => x.kcal).reduce((a, b) => a + b, 0)}
              </TableCell>
              <TableCell align="right">
                {selectedFoods.map((x) => x.fats).reduce((a, b) => a + b, 0)}
              </TableCell>
              <TableCell align="right">
                {selectedFoods.map((x) => x.carbohydrates).reduce((a, b) => a + b, 0)}
              </TableCell>
              <TableCell align="right">
                {selectedFoods.map((x) => x.protein).reduce((a, b) => a + b, 0)}
              </TableCell>
              <TableCell align="right">
                {selectedFoods.map((x) => x.pricePerUnit).reduce((a, b) => a + b, 0)} лв.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
