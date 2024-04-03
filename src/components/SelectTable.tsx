import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useState } from 'react';
import { FoodData } from '../pages/api/food';

type SelectTableProps = {
  data: FoodData[];
  setSelectedFoods: Dispatch<SetStateAction<FoodData[]>>;
};

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 50, maxWidth: 250 },
  {
    field: 'kcal',
    headerName: 'Calories',
    type: 'number',
    flex: 1,
    minWidth: 50,
    maxWidth: 140,
  },
  {
    field: 'fats',
    headerName: 'Fats',
    type: 'number',
    flex: 1,
    minWidth: 50,
    maxWidth: 140,
  },
  {
    field: 'carbohydrates',
    headerName: 'Carbohydrates',
    type: 'number',
    flex: 1,
    minWidth: 50,
    maxWidth: 250,
  },
  {
    field: 'protein',
    headerName: 'Protein',
    type: 'number',
    flex: 1,
    minWidth: 50,
    maxWidth: 140,
  },
  {
    field: 'pricePerUnit',
    headerName: 'Price per unit',
    type: 'number',
    flex: 1,
    minWidth: 50,
    maxWidth: 250,
    renderCell: (params) => {
      return `${params.value} лв.`;
    },
  },
];

export const SelectTable = (props: SelectTableProps) => {
  const { data, setSelectedFoods } = props;
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  return (
    <DataGrid
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setSelectedFoods(data.filter((x) => newRowSelectionModel.includes(x.id)));
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      sx={{
        backgroundColor: 'white',
      }}
      rows={data}
      columns={columns}
      checkboxSelection
    />
  );
};
