import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

export type FoodData = {
  id: string; // NOTE: uuid
  name: string;
  description: string;
  imageUrl: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  unit: string;
  pricePerUnit: number;
};

const saveDb = async (data: FoodData[]): Promise<boolean> => {
  const updatedData = JSON.stringify(data);
  await fs.writeFile(process.cwd() + '/src/database/foods.json', updatedData);
  return true;
};

const handleGetAll = async (): Promise<FoodData[]> => {
  const foodsJson = await fs.readFile(process.cwd() + '/src/database/foods.json', 'utf8');
  return JSON.parse(foodsJson) as FoodData[];
};

const handleGetByID = async (id: string): Promise<FoodData | undefined> => {
  const foodData = await handleGetAll();
  return foodData.find((x) => x.id === id);
};

const handleInsert = async (data: FoodData): Promise<boolean> => {
  const foodData = await handleGetAll();
  data.id = nanoid();
  foodData.push(data);

  return await saveDb(foodData);
};

const handleUpdate = async (data: FoodData): Promise<boolean> => {
  const foodData = await handleGetAll();

  return await saveDb(
    foodData.map((x) => {
      if (x.id === data.id) {
        x.name = data.name;
        x.description = data.description;
        x.imageUrl = data.imageUrl;
        x.kcal = data.kcal;
        x.protein = data.protein;
        x.carbohydrates = data.carbohydrates;
        x.fats = data.fats;
        x.unit = data.unit;
        x.pricePerUnit = data.pricePerUnit;
      }

      return x;
    }),
  );
};

const handleDelete = async (id: string): Promise<boolean> => {
  const foodData = await handleGetAll();

  return await saveDb(foodData.filter((x) => x.id !== id));
};

const validateStoreBody = (data: any, isUpdate: boolean): FoodData | undefined => {
  const result: FoodData = {
    id: nanoid(),
    name: '',
    description: '',
    imageUrl: '',
    kcal: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    unit: '',
    pricePerUnit: 0,
  };

  if (data.id) {
    result.id = String(data.id);
  }

  if (!data.id && isUpdate) {
    return undefined;
  }

  if (!data.name) {
    return undefined;
  }
  result.name = String(data.name);

  result.description = '';
  if (data.description) {
    result.description = String(data.description);
  }

  result.imageUrl = '';
  if (data.imageUrl) {
    result.imageUrl = String(data.imageUrl);
  }

  if (data.kcal === undefined) {
    return undefined;
  }
  result.kcal = Number(data.kcal);

  if (data.protein === undefined) {
    return undefined;
  }
  result.protein = Number(data.protein);

  if (data.carbohydrates === undefined) {
    return undefined;
  }
  result.carbohydrates = Number(data.carbohydrates);

  if (data.fats === undefined) {
    return undefined;
  }
  result.fats = Number(data.fats);

  if (data.pricePerUnit === undefined) {
    return undefined;
  }
  result.pricePerUnit = Number(data.pricePerUnit);

  if (!data.unit) {
    return undefined;
  }
  result.unit = String(data.unit);

  return result;
};

const validateDeleteBody = (data: any): string | undefined => {
  if (!data.id) {
    return undefined;
  }

  return String(data.id);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<FoodData[]>) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const getByIdResponse = await handleGetByID(String(req.query.id));
        if (getByIdResponse) {
          res.status(200).json([getByIdResponse]);
        } else {
          res.status(500).json([]);
        }
      } else {
        const getAllResponse = await handleGetAll();
        if (getAllResponse) {
          res.status(200).json(getAllResponse);
        } else {
          res.status(500).json([]);
        }
      }
      break;
    case 'POST':
      const postBody = validateStoreBody(req.body, false);
      if (!postBody) {
        res.status(400).json([]);
      } else {
        const insertResponse = await handleInsert(postBody);
        res.status(insertResponse ? 200 : 500).json([]);
      }
      break;
    case 'PUT':
      const putBody = validateStoreBody(req.body, true);
      if (!putBody) {
        res.status(400).json([]);
      } else {
        const updateResponse = await handleUpdate(putBody);
        res.status(updateResponse ? 200 : 500).json([]);
      }
      break;
    case 'DELETE':
      const deleteBody = validateDeleteBody(req.body);
      if (!deleteBody) {
        res.status(400).json([]);
      } else {
        const deleteResponse = await handleDelete(deleteBody);
        res.status(deleteResponse ? 200 : 500).json([]);
      }
      break;
    default:
      res.status(400).json([]);
      break;
  }
}
