import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { FoodCard } from '../components/FoodCard';
import { Layout } from '../components/Layout';
import { SearchField } from '../components/Search';
import { getAllFood } from '../config/foodApiController';
import { FoodData } from './api/food';

export default function List() {
  const [foods, setFoods] = useState<FoodData[]>([]);

  useEffect(() => {
    getAllFood().then((resp) => setFoods(resp));
  }, []);

  return (
    <Layout>
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        sx={{ width: '100%', marginTop: '40px', paddingBottom: '40px' }}
      >
        <Grid item xs={12} sx={{ width: '200px' }}>
          <SearchField setCurrentFoods={setFoods}></SearchField>
        </Grid>
        {foods.map((x) => {
          return (
            <Grid
              key={x.id}
              container
              justifyContent="center"
              alignItems="center"
              marginTop={3}
              lg={3}
              md={4}
              sm={6}
            >
              <FoodCard data={x} setFoods={setFoods} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}
