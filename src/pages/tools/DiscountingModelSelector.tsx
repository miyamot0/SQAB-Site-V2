/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { HotColumn, HotTable } from '@handsontable/react';
import Select from 'react-select';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import './Tools.css';
import {
  getExponentialProjection,
  getHyperbolicProjection,
  getQuasiHyperbolicProjection,
  getMyersonProjection,
  getRachlinProjection,
  getRodriguezLogueProjection,
  getEbertPrelecProjection,
  getbleichrodtProjection,
  getElementByModel,
} from './helpers/DiscountingHelpers';
import { PointArray, DiscountingResult, ModelOptions } from './helpers/DiscountingTypes';
import { isValidNumber } from './helpers/GeneralHelpers';
import { SingleOptionType } from './helpers/GeneralTypes';

export default function DiscountingModelSelector(): JSX.Element {
  const [hotData, setHotData] = useState<any[][]>();
  const [runningCalculation, setRunningCalculation] = useState<boolean>(false);
  const [modelOption, setModelOption] = useState<SingleOptionType>({
    label: 'Do Not Bound',
    value: 'Do Not Bound',
  });
  const [buttonStatusMsg, setButtonStatusMsg] = useState<string>('Calculate');
  const [resultsSummary, setResultsSummary] = useState<JSX.Element[]>([]);
  const [chartOptions, setChartOptions] = useState({
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
  });

  let worker: Worker | undefined = undefined;

  useEffect(() => {
    setHotData([
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
    ]);
  }, []);

  /**
   * loadExampleData
   */
  function loadExampleData(): void {
    setHotData([
      ['1', '1.0'],
      ['30', '0.9'],
      ['180', '0.8'],
      ['540', '0.7'],
      ['1080', '0.6'],
      ['2160', '0.5'],
      ['4320', '0.4'],
      ['8640', '0.3'],
      ['17280', '0.2'],
      ['', ''],
      ['', ''],
      ['', ''],
    ]);
  }

  /** calculateDemand
   *
   * Fire off worker
   *
   */
  function calculateDiscounting(): void {
    if (worker !== undefined) {
      return;
    }

    const thing = hotData;

    var mX = [];
    var mY = [];

    for (var i = 0; i < thing!.length; i++) {
      var temp = thing![i];

      const passCheck = isValidNumber(temp[0]) && isValidNumber(temp[1]);

      if (passCheck) {
        mX.push(temp[0]);
        mY.push(temp[1]);
      }
    }

    if (mX.length < 3 || mY.length < 3) {
      alert('Please enter more data.');
      setRunningCalculation(false);
      return;
    }

    worker = new Worker('./workers/worker_discounting.js');
    worker.onmessage = handleWorkerOutput;

    worker.postMessage({
      boundRachlin: modelOption.value !== 'Do not Bound',
      maxIterations: 500,
      x: mX,
      y: mY,
    });
  }

  /** handleWorkerOutput
   *
   * Receiver from worker
   *
   * @param {WorkerOutput} obj
   */
  function handleWorkerOutput(obj: any): void {
    if (obj.data.done) {
      const data = obj.data as DiscountingResult;

      const mFinalDelay = Math.max(...obj.data.x);
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
      let temp = [];
      for (var k = 0; k < obj.data.x.length; k++) {
        temp.push({
          x: obj.data.x[k],
          y: obj.data.y[k],
        });
      }

      let tempN = [];
      let tempE = [];
      let tempH = [];
      let tempBD = [];
      let tempMG = [];
      let tempR = [];
      let tempLP = [];
      let tempEP = [];
      let tempB = [];

      for (var i = 1; i <= mFinalDelay; ) {
        tempN.push({
          x: i,
          y: noiseElement!.Params[0],
        });

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
        else if (i > 1000000 && i <= 10000000) i = i + 1000000;

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
            <>
              <b>
                {res.Model} Param[{j}]:
              </b>{' '}
              {param}
              <br />
            </>
          );
        });

        const isTopRanked = index === 0;

        let extraMetrics: JSX.Element | null = null;

        if (isTopRanked && res.Model === 'noise') {
          extraMetrics = (
            <>
              <b>
                {res.Model} Area (Natural): {res.AUC.toFixed(6)}{' '}
              </b>
              <br />
              <b>
                {res.Model} Area (Log10 Scale): {res.AUClog10.toFixed(6)}{' '}
              </b>
              <br />
            </>
          );
        } else if (isTopRanked) {
          console.log(res);
          extraMetrics = (
            <>
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
            </>
          );
        }

        return (
          <p key={res.Model}>
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
      setButtonStatusMsg(obj.data.msg);
    }
  }

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Discounting Model Selector</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="toolsDescription">
                The Discounting Model Selector (Web) is a web-based tool for applying approximate
                Bayesian model selection for delay discounting applications. This program allows
                researchers and clinicians with to perform an empirical comparison of Discounting
                models for individual series of data. This method has been simplified by Discounting
                Model Selector through the use of an easy-to-use interface resembling common
                spreadsheet software. At present, the online version of the DMS is performed with
                only one discounting series at a time.
                <br />
                <br />
                <b>Based on the following works:</b>
                <br />
                Franck, C. T., Koffarnus, M. N., House, L. L., &#38; Bickel, W. K. (2015). Accurate
                characterization of delay discounting: a multiple model approach using approximate
                Bayesian model selection and a unified discounting measure. Journal of the
                Experimental Analysis of Behavior, 103(1), 218-233.
                https://doi.org/10.1002/jeab.128.{' '}
                <a href="https://doi.org/10.1002/jeab.128">doi: 10.1002/jeab.128</a>.
                <br />
                <br />
                Gilroy, S. P., Franck, C. T. &#38; Hantula, D. A. (2017). The discounting model
                selector: Statistical software for delay discounting applications. Journal of the
                Experimental Analysis of Behavior, 107(3), 388-401.{' '}
                <a href="https://doi.org/10.1002/jeab.257">doi: 10.1002/jeab.257</a>.
                <br />
                <br />
                Gilroy, S. P. &#38; Hantula, D. A. (2018). Discounting model selection with
                area-based measures: A case for numerical integration. Journal of the Experimental
                Analysis of Behavior.{' '}
                <a href="https://doi.org/10.1002/jeab.318">doi: 10.1002/jeab.318</a>.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow center className="row-eq-height">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Discounting Model Selection</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                This tool automates discounting model fitting, Approximate Bayesian Model Selection,
                model selection, and calculation of the Effective Delay 50 (ED50).
                <br></br>
                To perform model selection, input at least 3 pairs (x and y) of discounting data. At
                least three pairs of data are necessary to proceed.
                <br></br>
                Delay values (x) can be any number, though values must be between 0-1. This should
                be calculated as a proportion (i.e., the Y value divided by the Maximum Value). Any
                higher numbers will prevent you from proceeding.
              </MDBCardText>

              <MDBBtn
                noRipple
                style={{
                  width: '100%',
                  marginBottom: '25px',
                }}
                tag="a"
                href="#!"
                disabled={runningCalculation}
                onClick={() => loadExampleData()}
              >
                Load Example Data
              </MDBBtn>

              <HotTable
                data={hotData}
                colHeaders={true}
                rowHeaders={true}
                height="auto"
                stretchH="all"
                columnSorting={false}
                columns={[
                  { data: 0, type: 'string' },
                  { data: 1, type: 'string' },
                ]}
                contextMenu={true}
                licenseKey="non-commercial-and-evaluation"
              >
                <HotColumn title="Delays" />
                <HotColumn title="Values" />
              </HotTable>

              <label style={{ width: '100%', marginTop: '25px' }}>
                <span>Rachlin Behavior:</span>
                <Select
                  options={ModelOptions}
                  onChange={(option) => {
                    setModelOption(option!);
                  }}
                  value={modelOption}
                  styles={{
                    menu: (base) => ({
                      ...base,
                      width: 'max-content',
                      minWidth: '100%',
                    }),
                  }}
                />
              </label>

              <MDBBtn
                noRipple
                style={{
                  width: '100%',
                  marginTop: '25px',
                }}
                tag="a"
                href="#!"
                disabled={runningCalculation}
                onClick={() => {
                  setRunningCalculation(true);
                  calculateDiscounting();
                }}
              >
                {buttonStatusMsg}
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard className="outputPanel">
            <MDBCardBody>
              <MDBCardTitle>Fitting Results</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}></MDBCardText>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
              {resultsSummary !== null && resultsSummary}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
