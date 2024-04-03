import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FoodForm } from '../../components/FoodForm';
import { Layout } from '../../components/Layout';
import { getAllFood, updateFood } from '../../config/foodApiController';
import { FoodData } from '../api/food';

export default function Update() {
  const [disableBtn, setDisableBtn] = useState(false);
  const [defaultValue, setDefaultValue] = useState<FoodData>();

  const { control, register, formState, reset, setValue, trigger } = useForm<FoodData>({
    mode: 'onChange',
  });

  const router = useRouter();
  useEffect(() => {
    getAllFood().then((resp) => {
      const dataToUpdate = resp.find((x) => x.id === router.query.id);
      if (!dataToUpdate) {
        router.push('/add');
        return;
      }

      setDefaultValue(dataToUpdate);
      setValue('id', dataToUpdate?.id ?? '');
      setValue('name', dataToUpdate?.name ?? '');
      setValue('description', dataToUpdate?.description ?? '');
      setValue('imageUrl', dataToUpdate?.imageUrl ?? '');
      setValue('unit', dataToUpdate?.unit ?? '');
      setValue('kcal', dataToUpdate?.kcal ?? 0);
      setValue('pricePerUnit', dataToUpdate?.pricePerUnit ?? 0);
      setValue('protein', dataToUpdate?.protein ?? 0);
      setValue('carbohydrates', dataToUpdate?.carbohydrates ?? 0);
      setValue('fats', dataToUpdate?.fats ?? 0);

      trigger();
    });
  }, [router, setValue]);

  const onSubmitData = (data: FoodData) => {
    console.log(data);
    setDisableBtn(true);
    updateFood({
      id: defaultValue?.id ?? '',
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
      router.push('/list');
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
          isUpdate
        />
      </Grid>
    </Layout>
  );
}
