import axios from 'axios';
import qs from 'qs';
import { FoodData } from '../pages/api/food';

const host = 'http://localhost:3000/api/food';

export const getAllFood = async () => {
  const response = await axios.get(host);
  return response.data as FoodData[];
};

export const getFoodById = async (id: string) => {
  var str = qs.stringify({ id: id });
  const response = await axios.get(host + '?' + str);
  return response.data as FoodData;
};

export const insertFood = async (data: FoodData) => {
  await axios.post(host, data);
};

export const updateFood = async (data: FoodData) => {
  await axios.put(host, data);
};

export const deleteFood = async (data: { id: string }) => {
  await axios.delete(host, { data });
};
