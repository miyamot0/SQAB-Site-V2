/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { DiscountingResult, PointArray } from '../types/DiscountingTypes';
import {
  getbleichrodtProjection,
  getEbertPrelecProjection,
  getElementByModel,
  getExponentialProjection,
  getHyperbolicProjection,
  getMyersonProjection,
  getQuasiHyperbolicProjection,
  getRachlinProjection,
  getRodriguezLogueProjection,
} from './DiscountingHelpers';

export const InitialDiscountingChartState = {
  chart: {
    height: '600px',
  },
  title: {
    text: 'Discounting Model Selection Procedure',
  },
  series: [
    {
      name: 'Noise',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(190,128,255,1)',
      borderColor: 'rgba(190,128,255,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Exponential',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(12,21,42,1)',
      borderColor: 'rgba(12,21,42,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Hyperbolic',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(152,36,56,1)',
      borderColor: 'rgba(152,36,56,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Quasi-Hyperbolic',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(235,84,10,1)',
      borderColor: 'rgba(235,84,10,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Green-Myerson',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(50,124,203,1)',
      borderColor: 'rgba(50,124,203,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Rachlin',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(20,182,148,1)',
      borderColor: 'rgba(20,182,148,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Loewenstein-Prelec',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(67,162,202,1)',
      borderColor: 'rgba(67,162,202,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Ebert-Prelec',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(255,237,160,1)',
      borderColor: 'rgba(255,237,160,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Bleichrodt et al.',
      data: [] as PointArray[],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(44,162,95,1)',
      borderColor: 'rgba(44,162,95,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1,
      borderJoinStyle: 'miter',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: 'rgba(0,0,0,0)',
      pointHoverBorderColor: 'rgba(0,0,0,0)',
      pointHoverBorderWidth: 0,
    },
    {
      name: 'Raw Data',
      data: [] as PointArray[],
      fill: false,
      color: 'black',
      lineTension: 0,
      backgroundColor: 'rgba(0,0,0,1)',
      borderColor: 'rgba(0,0,0,0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 3,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,0,0,1)',
      pointBackgroundColor: '#000',
      pointBorderWidth: 3,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(0,0,0,1)',
      pointHoverBorderColor: 'rgba(0,0,0,1)',
      pointHoverBorderWidth: 4,
      pointRadius: 20,
      pointHitRadius: 10,
      spanGaps: false,
      lineWidth: 0,
      lineWidthPlus: 0,
      states: {
        hover: {
          enabled: false,
        },
      },
    },
  ],
  yAxis: {
    title: {
      text: 'Subjective Value',
    },
    min: 0,
    max: 1,
  },
  xAxis: {
    title: {
      text: 'Unit Price',
    },
    type: 'logarithmic',
  },
};

export interface handleDiscountingWorkerOutput {
  ev: MessageEvent<any>;
  worker: Worker | undefined;
  setRunningCalculation: any;
  setResultsSummary: any;
  setButtonStatusMsg: any;
  setChartOptions: any;
}

/** handleWorkerOutput
 *
 * Receiver from worker
 *
 * @param {WorkerOutput} obj
 */
export function handleDiscountingWorkerOutput({
  ev,
  worker,
  setRunningCalculation,
  setResultsSummary,
  setButtonStatusMsg,
  setChartOptions,
}: handleDiscountingWorkerOutput): void {
  if (ev.data.done) {
    const data = ev.data as DiscountingResult;

    const mFinalDelay = Math.max(...ev.data.x);
    let plotLast = false;

    const noiseElement = getElementByModel(data.results, 'Noise');
    const expElement = getElementByModel(data.results, 'Exponential');
    const hypElement = getElementByModel(data.results, 'Hyperbolic');
    const bdElement = getElementByModel(data.results, 'Beta-Delta');
    const mgElement = getElementByModel(data.results, 'Green-Myerson');
    const rachElement = getElementByModel(data.results, 'Rachlin');
    const lpElement = getElementByModel(data.results, 'Loewstein-Prelec');
    const epElement = getElementByModel(data.results, 'Ebert-Prelec');
    const belElement = getElementByModel(data.results, 'Beleichrodt');

    // Map points
    const temp = [];
    for (let k = 0; k < ev.data.x.length; k++) {
      temp.push({
        x: ev.data.x[k],
        y: ev.data.y[k],
      });
    }

    const tempN = [];
    const tempE = [];
    const tempH = [];
    const tempBD = [];
    const tempMG = [];
    const tempR = [];
    const tempLP = [];
    const tempEP = [];
    const tempB = [];

    for (let i = 1; i <= mFinalDelay; ) {
      if (noiseElement) {
        tempN.push({
          x: i,
          y: noiseElement.Params[0],
        });
      }

      if (expElement) {
        tempE.push({
          x: i,
          y: getExponentialProjection(i, expElement.Params),
        });
      }

      if (hypElement) {
        tempH.push({
          x: i,
          y: getHyperbolicProjection(i, hypElement.Params),
        });
      }

      if (bdElement) {
        tempBD.push({
          x: i,
          y: getQuasiHyperbolicProjection(i, bdElement.Params),
        });
      }

      if (mgElement) {
        tempMG.push({
          x: i,
          y: getMyersonProjection(i, mgElement.Params),
        });
      }

      if (rachElement) {
        tempR.push({
          x: i,
          y: getRachlinProjection(i, rachElement.Params),
        });
      }

      if (lpElement) {
        tempLP.push({
          x: i,
          y: getRodriguezLogueProjection(i, lpElement.Params),
        });
      }

      if (epElement) {
        tempEP.push({
          x: i,
          y: getEbertPrelecProjection(i, epElement.Params),
        });
      }

      if (belElement) {
        tempB.push({
          x: i,
          y: getbleichrodtProjection(i, belElement.Params),
        });
      }

      if (i > 0 && i <= 10) i = i + 1;
      else if (i > 10 && i <= 100) i = i + 10;
      else if (i > 100 && i <= 1000) i = i + 100;
      else if (i > 1000 && i <= 10000) i = i + 1000;
      else if (i > 10000 && i <= 100000) i = i + 10000;
      else if (i > 100000 && i <= 1000000) i = i + 100000;
      else if (i > 1000000 && i <= 10000000) i = i + 500000;

      if (plotLast) {
        i = mFinalDelay + 1;
      } else if (i > mFinalDelay) {
        i = mFinalDelay;
        plotLast = true;
      }
    }

    setChartOptions({
      chart: {
        height: '600px',
      },
      title: {
        text: 'Discounting Model Selection Procedure',
      },
      series: [
        {
          name: 'Noise',
          data: tempN,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(190,128,255,1)',
          borderColor: 'rgba(190,128,255,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Exponential',
          data: tempE,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(12,21,42,1)',
          borderColor: 'rgba(12,21,42,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Hyperbolic',
          data: tempH,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(152,36,56,1)',
          borderColor: 'rgba(152,36,56,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Quasi-Hyperbolic',
          data: tempBD,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(235,84,10,1)',
          borderColor: 'rgba(235,84,10,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Green-Myerson',
          data: tempMG,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(50,124,203,1)',
          borderColor: 'rgba(50,124,203,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Rachlin',
          data: tempR,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(20,182,148,1)',
          borderColor: 'rgba(20,182,148,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Loewenstein-Prelec',
          data: tempLP,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(67,162,202,1)',
          borderColor: 'rgba(67,162,202,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Ebert-Prelec',
          data: tempEP,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(255,237,160,1)',
          borderColor: 'rgba(255,237,160,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Bleichrodt et al.',
          data: tempB,
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(44,162,95,1)',
          borderColor: 'rgba(44,162,95,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth: 0,
        },
        {
          name: 'Raw Data',
          data: temp,
          fill: false,
          color: 'black',
          lineTension: 0,
          backgroundColor: 'rgba(0,0,0,1)',
          borderColor: 'rgba(0,0,0,0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 3,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: '#000',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBorderColor: 'rgba(0,0,0,1)',
          pointHoverBorderWidth: 4,
          pointRadius: 20,
          pointHitRadius: 10,
          spanGaps: false,
          lineWidth: 0,
          lineWidthPlus: 0,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      ],
      yAxis: {
        title: {
          text: 'Subjective Value',
        },
        min: 0,
        max: 1,
      },
      xAxis: {
        title: {
          text: 'Delay',
        },
        type: 'logarithmic',
      },
    });

    const resArray: JSX.Element[] = data.results.map((res, index) => {
      const out = res.Params.map((param, j) => {
        return (
          <div key={`param-${res.Model}-${index}`}>
            <b>
              {res.Model} Param[{j}]:
            </b>{' '}
            {param}
            <br />
          </div>
        );
      });

      const isTopRanked = index === 0;

      let extraMetrics: JSX.Element | null = null;

      if (isTopRanked && res.Model === 'noise') {
        extraMetrics = (
          <div key={`area-${res.Model}-${index}`}>
            <b>
              {res.Model} Area (Natural): {res.AUC.toFixed(6)}{' '}
            </b>
            <br />
            <b>
              {res.Model} Area (Log10 Scale): {res.AUClog10.toFixed(6)}{' '}
            </b>
            <br />
          </div>
        );
      } else if (isTopRanked) {
        extraMetrics = (
          <div key={`ed50-${res.Model}-${index}`}>
            <b>
              {res.Model} ln(ED50): {Math.log(res.ED50).toFixed(6)}{' '}
            </b>
            <br />
            <b>
              {res.Model} Area (Natural): {res.AUC.toFixed(6)}{' '}
            </b>
            <br />
            <b>
              {res.Model} Area (Log10 Scale): {res.AUClog10.toFixed(6)}{' '}
            </b>
            <br />
          </div>
        );
      }

      return (
        <p key={`${res.Model}-rank-${index}`}>
          <b>Rank #{index + 1}</b>
          <br />
          {out}
          <b>{res.Model} BIC:</b> {res.BIC.toFixed(6)}
          <br />
          <b>{res.Model} AIC:</b> {res.AIC.toFixed(6)}
          <br />
          <b>{res.Model} RMS Error:</b> {res.RMSE.toFixed(6)}
          <br />
          <b>{res.Model} Avg Error:</b> {res.MSE.toFixed(6)}
          <br />
          <b>{res.Model} Probability:</b> {res.Probability.toFixed(6)}
          <br />
          {extraMetrics !== null && extraMetrics}
        </p>
      );
    });

    setResultsSummary(resArray);
    setButtonStatusMsg('Calculate');
    setRunningCalculation(false);
  } else {
    setButtonStatusMsg(ev.data.msg);
  }
}
