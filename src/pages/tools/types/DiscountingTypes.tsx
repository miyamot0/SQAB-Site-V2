import { SingleOptionType } from './GeneralTypes';

export interface DiscountingFit {
  AIC: number;
  AUC: number;
  AUClog10: number;
  BF: number;
  BIC: number;
  ED50: number;
  MSE: number;
  Model: string;
  Params: number[];
  Probability: number;
  RMSE: number;
  done: boolean;
}

export interface DiscountingResult {
  done: boolean;
  results: DiscountingFit[];
}

export interface PointArray {
  x: number;
  y: number;
}

export const ModelOptions: SingleOptionType[] = [
  { label: 'Do Not Bound', value: 'Do Not Bound' },
  { label: 'Drop if S > 1', value: 'Drop if S > 1' },
];
