import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { DisplayTable } from '../components/DisplayTable';
import { Layout } from '../components/Layout';
import { SelectTable } from '../components/SelectTable';
import { getAllFood } from '../config/foodApiController';
import { FoodData } from './api/food';

export default function Home() {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodData[]>([]);

  useEffect(() => {
    getAllFood().then((resp) => setFoods(resp));
  }, []);

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', marginTop: '40px', paddingBottom: '40px' }}
      >
        <Grid
          sx={{ marginRight: '100px', marginLeft: '100px', marginBottom: '50px' }}
          item
          container
          xs={12}
        >
          <SelectTable setSelectedFoods={setSelectedFoods} data={foods}></SelectTable>
        </Grid>

        <DisplayTable selectedFoods={selectedFoods} />
      </Grid>
    </Layout>
  );
}
