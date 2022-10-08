/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { handleWorkerOutput } from '../PmaxHelpers';

describe('', () => {
  const ModelOptions = [
    { value: 'ZBE-2', label: '2-Parameter ZBE (no K)' },
    { value: 'ZBE-3', label: '3-Parameter ZBE (with K)' },
    { value: 'Exponentiated', label: 'Exponentiated Model' },
    { value: 'Exponential', label: 'Exponential Model' },
  ];

  it('Should fire', () => {
    let ev = {
      data: {
        done: true,
        sheet: [['1', '1', '1', '1', '1']],
      },
    } as MessageEvent<any>;
    const setHotData = jest.fn();
    const setHotData2 = jest.fn();
    const setRunningCalculation = jest.fn();
    const worker = {} as Worker;

    handleWorkerOutput({
      ev,
      modelOption: ModelOptions[0],
      setHotData,
      setHotData2,
      setRunningCalculation,
      worker,
    });

    handleWorkerOutput({
      ev,
      modelOption: ModelOptions[1],
      setHotData,
      setHotData2,
      setRunningCalculation,
      worker,
    });

    handleWorkerOutput({
      ev,
      modelOption: ModelOptions[2],
      setHotData,
      setHotData2,
      setRunningCalculation,
      worker,
    });

    ev = {
      data: {
        done: true,
        sheet: [['1', '1', '1', '', '']],
      },
    } as MessageEvent<any>;
    handleWorkerOutput({
      ev,
      modelOption: ModelOptions[3],
      setHotData,
      setHotData2,
      setRunningCalculation,
      worker,
    });

    ev = {
      data: {
        done: false,
        sheet: [['1', '1', '1', '', '']],
      },
    } as MessageEvent<any>;
    handleWorkerOutput({
      ev,
      modelOption: ModelOptions[3],
      setHotData,
      setHotData2,
      setRunningCalculation,
      worker,
    });
  });
});
