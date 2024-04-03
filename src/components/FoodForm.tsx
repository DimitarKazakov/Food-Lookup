import { Box, Button, TextField } from '@mui/material';
import { Control, Form, FormState, UseFormRegister } from 'react-hook-form';
import { FoodData } from '../pages/api/food';

type FoodFormProps = {
  onSubmitData: (data: FoodData) => void;
  disableBtn: boolean;
  control: Control<FoodData, any>;
  register: UseFormRegister<FoodData>;
  formState: FormState<FoodData>;
  isUpdate?: boolean;
};

export const FoodForm = (props: FoodFormProps) => {
  const { onSubmitData, disableBtn, control, register, formState, isUpdate } = props;
  return (
    <Form
      control={control}
      onSubmit={({ data }) => onSubmitData(data)}
      noValidate
      className="w-[800px]"
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap="12px">
        <TextField
          id="name"
          className="w-[600px]"
          label="Name"
          variant="outlined"
          {...register('name', {
            required: true,
          })}
        />

        <TextField
          id="description"
          rows={4}
          className="w-[600px]"
          label="Description"
          variant="outlined"
          {...register('description')}
        />

        <TextField
          id="imageUrl"
          className="w-[600px]"
          label="Image Url"
          variant="outlined"
          {...register('imageUrl')}
        />

        <TextField
          id="kcal"
          type="number"
          className="w-[600px]"
          label="Kcal"
          variant="outlined"
          {...register('kcal', {
            required: true,
            valueAsNumber: true,
          })}
        />

        <TextField
          id="protein"
          type="number"
          className="w-[600px]"
          label="Protein"
          variant="outlined"
          {...register('protein', {
            required: true,
            valueAsNumber: true,
          })}
        />

        <TextField
          id="carbohydrates"
          type="number"
          className="w-[600px]"
          label="Carbohydrates"
          variant="outlined"
          {...register('carbohydrates', {
            required: true,
            valueAsNumber: true,
          })}
        />

        <TextField
          id="fats"
          type="number"
          className="w-[600px]"
          label="Fats"
          variant="outlined"
          {...register('fats', {
            required: true,
            valueAsNumber: true,
          })}
        />

        <TextField
          id="unit"
          className="w-[600px]"
          label="Unit"
          variant="outlined"
          {...register('unit', {
            required: true,
          })}
        />

        <TextField
          id="pricePerUnit"
          type="number"
          className="w-[600px]"
          label="Price per unit"
          variant="outlined"
          {...register('pricePerUnit', {
            required: true,
          })}
        />

        <Button
          disabled={!formState.isValid || disableBtn}
          className="mt-4 w-[350px] h-[50px]"
          variant="contained"
          type="submit"
        >
          {isUpdate ? 'Update Food' : 'Add Food'}
        </Button>
      </Box>
    </Form>
  );
};
