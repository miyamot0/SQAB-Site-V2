import { WorkerPmaxResult } from '../AnalyticPmax';
import { round } from './GeneralHelpers';

export interface handleWorkerOutput {
  ev: MessageEvent<any>;
  modelOption: { value: string; label: string };
  setHotData: any;
  setHotData2: any;
  setRunningCalculation: any;
  worker: Worker | undefined;
}

/** handleWorkerOutput
 *
 * @param {WorkerOutput} obj
 */
export function handleWorkerOutput({
  ev,
  modelOption,
  setHotData,
  setHotData2,
  setRunningCalculation,
  worker,
}: handleWorkerOutput): void {
  const data = ev.data as WorkerPmaxResult;

  if (data.done && data.sheet) {
    worker = undefined;

    const pmaxRow = modelOption.value.includes('ZBE-2') ? 2 : 3;

    const trimmedPrecision = data.sheet.map(sheet => {
      const iSheet = sheet;
      const pmaxValue = iSheet[pmaxRow].toString();

      if (pmaxValue.trim().length === 0) {
        return iSheet;
      } else {
        iSheet[pmaxRow] = round(pmaxValue, 4);
        return iSheet;
      }
    });

    setHotData(trimmedPrecision);
    setHotData2(data.sheet);

    setRunningCalculation(false);
    return;
  } else {
    return;
  }
}
