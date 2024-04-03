import { Grid } from '@mui/material';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FoodForm } from '../components/FoodForm';
import { Layout } from '../components/Layout';
import { insertFood } from '../config/foodApiController';
import { FoodData } from './api/food';

export default function Add() {
  const { control, register, formState, reset } = useForm<FoodData>({
    mode: 'onChange',
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const onSubmitData = (data: FoodData) => {
    setDisableBtn(true);
    insertFood({
      id: nanoid(),
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      kcal: Number(data.kcal),
      protein: Number(data.protein),
      carbohydrates: Number(data.carbohydrates),
      fats: Number(data.fats),
      unit: data.unit,
      pricePerUnit: Number(data.pricePerUnit),
    }).then(() => {
      reset();
      setDisableBtn(false);
    });
  };

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', marginTop: '40px', paddingBottom: '20px' }}
      >
        <FoodForm
          disableBtn={disableBtn}
          control={control}
          register={register}
          formState={formState}
          onSubmitData={onSubmitData}
        />
      </Grid>
    </Layout>
  );
}
