import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { deleteFood, getAllFood } from '../config/foodApiController';
import { FoodData } from '../pages/api/food';

type FoodCardProps = {
  data: FoodData;
  setFoods: Dispatch<SetStateAction<FoodData[]>>;
};
export const FoodCard = (props: FoodCardProps) => {
  const { data, setFoods } = props;

  const router = useRouter();

  return (
    <Card sx={{ width: 330 }}>
      <CardMedia sx={{ height: 140 }} image={data.imageUrl} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>

        <Typography className="mt-3" variant="body2" color="#42a5f5">
          ➤ Protein: {data.protein}
        </Typography>
        <Typography variant="body2" color="#42a5f5">
          ➤ Carbohydrates: {data.carbohydrates}
        </Typography>
        <Typography variant="body2" color="#42a5f5">
          ➤ Fats: {data.fats}
        </Typography>
        <Typography variant="body2" color="#42a5f5">
          ➤ Kcal: {data.kcal}
        </Typography>
        <Typography variant="body2" color="#42a5f5">
          ➤ Unit: {data.unit}
        </Typography>
        <Typography variant="body2" color="#42a5f5">
          ➤ Price per unit: {data.pricePerUnit} лв.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            router.push(`/update/${data.id}`);
          }}
          variant="contained"
          size="small"
          color="info"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            deleteFood({ id: data.id }).then(() => getAllFood().then((resp) => setFoods(resp)));
          }}
          variant="contained"
          size="small"
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
