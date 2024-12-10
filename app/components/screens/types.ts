export type Mushroom = {
  id?: number;
  path: string;
  predictions: Prediction[];
};

export type Prediction = {
  id: number;
  probability: number;
};
