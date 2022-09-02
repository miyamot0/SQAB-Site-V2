export interface DemandResult {
  AIC: number;
  BIC: number;
  FitK: string;
  SetK: number;
  HQ: number;
  LQ: number;
  Q0: number;
  Alpha: number;
  K: number;
  Model: string;
  Params: number[];
  PmaxA: number;
  OmaxA: number;
  MSE: number;
  RMSE: number;
  Y: number[];
  X: number[];
  done: boolean;
}
