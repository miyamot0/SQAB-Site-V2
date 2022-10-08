/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DiscountingResult } from '../../types/DiscountingTypes';
import { handleDiscountingWorkerOutput } from '../DiscountingCharting';

describe('DiscountingCharting', () => {
  it('Fire end', () => {
    const worker = null as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setButtonStatusMsg = jest.fn();
    const setChartOptions = jest.fn();

    const baseState = {
      AIC: 0,
      AUC: 0,
      AUClog10: 0,
      BF: 1,
      BIC: 0,
      ED50: 1,
      MSE: 0,
      Model: '',
      Params: [1, 1, 1],
      Probability: 0,
      RMSE: 0,
      done: true,
    };

    const totalFits = [
      { ...baseState, Model: 'Noise' },
      { ...baseState, Model: 'Exponential' },
      { ...baseState, Model: 'Hyperbolic' },
      { ...baseState, Model: 'Beta-Delta' },
      { ...baseState, Model: 'Green-Myerson' },
      { ...baseState, Model: 'Rachlin' },
      { ...baseState, Model: 'Loewstein-Prelec' },
      { ...baseState, Model: 'Ebert-Prelec' },
      { ...baseState, Model: 'Beleichrodt' },
    ];

    const res = {
      done: true,
      results: totalFits,
      x: [1, 100, 1000, 10000, 100000, 1000000, 10000000],
      y: [1000, 100, 10, 1, 0.1, 0.01, 0.001],
    } as DiscountingResult;

    const ev = {
      data: res,
      done: true,
      msg: 'finish',
    } as unknown as MessageEvent<any>;

    handleDiscountingWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setButtonStatusMsg,
      setChartOptions,
    });
  });

  it('Fire ongoing', () => {
    const worker = null as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setButtonStatusMsg = jest.fn();
    const setChartOptions = jest.fn();

    const baseState = {
      AIC: 0,
      AUC: 0,
      AUClog10: 0,
      BF: 1,
      BIC: 0,
      ED50: 1,
      MSE: 0,
      Model: '',
      Params: [1, 1, 1],
      Probability: 0,
      RMSE: 0,
      done: true,
    };

    const totalFits = [
      { ...baseState, Model: 'Noise' },
      { ...baseState, Model: 'Exponential' },
      { ...baseState, Model: 'Hyperbolic' },
      { ...baseState, Model: 'Beta-Delta' },
      { ...baseState, Model: 'Green-Myerson' },
      { ...baseState, Model: 'Rachlin' },
      { ...baseState, Model: 'Loewstein-Prelec' },
      { ...baseState, Model: 'Ebert-Prelec' },
      { ...baseState, Model: 'Beleichrodt' },
    ];

    const res = {
      done: true,
      results: totalFits,
      x: [1, 100, 1000, 10000, 100000, 1000000, 10000000],
      y: [1000, 100, 10, 1, 0.1, 0.01, 0.001],
    } as DiscountingResult;

    const ev = {
      data: res,
      done: false,
      msg: 'finish',
    } as unknown as MessageEvent<any>;

    handleDiscountingWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setButtonStatusMsg,
      setChartOptions,
    });
  });

  it('Fire ongoing, Noise won', () => {
    const worker = null as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setButtonStatusMsg = jest.fn();
    const setChartOptions = jest.fn();

    const baseState = {
      AIC: 0,
      AUC: 0,
      AUClog10: 0,
      BF: 1,
      BIC: 0,
      ED50: 1,
      MSE: 0,
      Model: '',
      Params: [1, 1, 1],
      Probability: 0,
      RMSE: 0,
      done: true,
    };

    const totalFits = [
      { ...baseState, Model: 'noise', Probability: 0.9 },
      { ...baseState, Model: 'Exponential' },
      { ...baseState, Model: 'Hyperbolic' },
      { ...baseState, Model: 'Beta-Delta' },
      { ...baseState, Model: 'Green-Myerson' },
      { ...baseState, Model: 'Rachlin' },
      { ...baseState, Model: 'Loewstein-Prelec' },
      { ...baseState, Model: 'Ebert-Prelec' },
      { ...baseState, Model: 'Beleichrodt' },
    ];

    const res = {
      done: true,
      results: totalFits,
      x: [1, 100, 1000, 10000, 100000, 1000000, 10000000],
      y: [1000, 100, 10, 1, 0.1, 0.01, 0.001],
    } as DiscountingResult;

    const ev = {
      data: res,
      done: false,
      msg: 'finish',
    } as unknown as MessageEvent<any>;

    handleDiscountingWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setButtonStatusMsg,
      setChartOptions,
    });
  });

  it('Fire ongoing, Noise won, not done', () => {
    const worker = null as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setButtonStatusMsg = jest.fn();
    const setChartOptions = jest.fn();

    const baseState = {
      AIC: 0,
      AUC: 0,
      AUClog10: 0,
      BF: 1,
      BIC: 0,
      ED50: 1,
      MSE: 0,
      Model: '',
      Params: [1, 1, 1],
      Probability: 0,
      RMSE: 0,
      done: false,
    };

    const totalFits = [
      { ...baseState, Model: 'noise', Probability: 0.9 },
      { ...baseState, Model: 'Exponential' },
      { ...baseState, Model: 'Hyperbolic' },
      { ...baseState, Model: 'Beta-Delta' },
      { ...baseState, Model: 'Green-Myerson' },
      { ...baseState, Model: 'Rachlin' },
      { ...baseState, Model: 'Loewstein-Prelec' },
      { ...baseState, Model: 'Ebert-Prelec' },
      { ...baseState, Model: 'Beleichrodt' },
    ];

    const res = {
      done: false,
      results: totalFits,
      x: [1, 100, 1000, 10000, 100000, 1000000, 10000000],
      y: [1000, 100, 10, 1, 0.1, 0.01, 0.001],
    } as DiscountingResult;

    const ev = {
      data: res,
      done: false,
      msg: 'finish',
    } as unknown as MessageEvent<any>;

    handleDiscountingWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setButtonStatusMsg,
      setChartOptions,
    });
  });
});
