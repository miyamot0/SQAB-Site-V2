/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DemandResult } from '../../types/DemandTypes';
import {
  constructExponentialChart,
  constructExponentiatedChart,
  constructIHS2Chart,
  constructIHS3Chart,
  handleDemandWorkerOutput,
} from '../DemandCharting';

describe('DemandCharting', () => {
  it('Fires all', () => {
    const setChartOptions = jest.fn();
    const obj = {
      AIC: 1,
      BIC: 1,
      FitK: 'range',
      SetK: 3,
      HQ: 1000,
      LQ: 10,
      Q0: 10,
      Alpha: 0.001,
      K: 3,
      Model: 'Exponential',
      Params: [10, 0.001],
      PmaxA: 1,
      OmaxA: 100,
      MSE: 0,
      RMSE: 0,
      Y: [1000, 100, 10],
      X: [1, 100, 1000],
      done: true,
    } as DemandResult;

    constructExponentialChart(obj, setChartOptions);
    constructExponentiatedChart(obj, setChartOptions);
    constructIHS3Chart(obj, setChartOptions);
    constructIHS2Chart(obj, setChartOptions);
  });
});

describe('handleDemandWorkerOutput', () => {
  it('Using good data: Exponential Model', () => {
    const ev = {
      data: {
        AIC: 1,
        BIC: 1,
        FitK: 'range',
        SetK: 3,
        HQ: 1000,
        LQ: 10,
        Q0: 10,
        Alpha: 0.001,
        K: 3,
        Model: 'Exponential Model',
        Params: [10, 0.001],
        PmaxA: 1,
        OmaxA: 100,
        MSE: 0,
        RMSE: 0,
        Y: [1000, 100, 10],
        X: [1, 100, 1000],
        done: true,
      } as DemandResult,
    } as unknown as MessageEvent<any>;
    const worker = {} as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setChartOptions = jest.fn();

    handleDemandWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setChartOptions,
    });
  });

  it('Using good data: Exponentiated Model', () => {
    const ev = {
      data: {
        AIC: 1,
        BIC: 1,
        FitK: 'range',
        SetK: 3,
        HQ: 1000,
        LQ: 10,
        Q0: 10,
        Alpha: 0.001,
        K: 3,
        Model: 'Exponentiated Model',
        Params: [10, 0.001],
        PmaxA: 1,
        OmaxA: 100,
        MSE: 0,
        RMSE: 0,
        Y: [1000, 100, 10],
        X: [1, 100, 1000],
        done: true,
      } as DemandResult,
    } as unknown as MessageEvent<any>;
    const worker = {} as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setChartOptions = jest.fn();

    handleDemandWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setChartOptions,
    });
  });

  it('Using good data: Zero-bounded Model (with K)', () => {
    const ev = {
      data: {
        AIC: 1,
        BIC: 1,
        FitK: 'range',
        SetK: 3,
        HQ: 1000,
        LQ: 10,
        Q0: 10,
        Alpha: 0.001,
        K: 3,
        Model: 'Zero-bounded Model (with K)',
        Params: [10, 0.001],
        PmaxA: 1,
        OmaxA: 100,
        MSE: 0,
        RMSE: 0,
        Y: [1000, 100, 10],
        X: [1, 100, 1000],
        done: true,
      } as DemandResult,
    } as unknown as MessageEvent<any>;
    const worker = {} as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setChartOptions = jest.fn();

    handleDemandWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setChartOptions,
    });
  });

  it('Using good data: Zero-bounded Model (no K)', () => {
    const ev = {
      data: {
        AIC: 1,
        BIC: 1,
        FitK: 'range',
        SetK: 3,
        HQ: 1000,
        LQ: 10,
        Q0: 10,
        Alpha: 0.001,
        K: 3,
        Model: 'Zero-bounded Model (no K)',
        Params: [10, 0.001],
        PmaxA: 1,
        OmaxA: 100,
        MSE: 0,
        RMSE: 0,
        Y: [1000, 100, 10],
        X: [1, 100, 1000],
        done: true,
      } as DemandResult,
    } as unknown as MessageEvent<any>;
    const worker = {} as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setChartOptions = jest.fn();

    handleDemandWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setChartOptions,
    });
  });

  it('Using null data', () => {
    const ev = {
      done: true,
    } as unknown as MessageEvent<any>;
    const worker = {} as unknown as Worker;
    const setRunningCalculation = jest.fn();
    const setResultsSummary = jest.fn();
    const setChartOptions = jest.fn();

    handleDemandWorkerOutput({
      ev,
      worker,
      setRunningCalculation,
      setResultsSummary,
      setChartOptions,
    });
  });
});
