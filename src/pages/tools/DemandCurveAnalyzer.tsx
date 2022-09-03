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
import { DemandResult } from './helpers/DemandTypes';
import { SingleOptionType } from './helpers/GeneralTypes';

import './Tools.css';
import {
  renderExponentialDemand,
  renderExponentiatedDemand,
  renderIHS2Demand,
  renderIHS3Demand,
  unIHS,
} from './helpers/DemandHelpers';
import { isValidNumber } from './helpers/GeneralHelpers';

const ModelOptions: SingleOptionType[] = [
  { label: 'Exponential Model', value: 'Exponential Model' },
  { label: 'Exponentiated Model', value: 'Exponentiated Model' },
  { label: 'Zero-bounded Model (with K)', value: 'Zero-bounded Model (with K)' },
  { label: 'Zero-bounded Model (no K)', value: 'Zero-bounded Model (no K)' },
];

export default function DemandCurveAnalyzer(): JSX.Element {
  const [hotData, setHotData] = useState<any[][]>();
  const [runningCalculation, setRunningCalculation] = useState<boolean>(false);

  const [kOptionsAvailable, setKOptionsAvailable] = useState<SingleOptionType[]>([
    { label: 'Log Range', value: 'Log Range' },
    { label: 'Fit as Parameter', value: 'Fit as Parameter' },
    { label: 'Custom', value: 'Custom' },
  ]);

  const [modelOption, setModelOption] = useState<SingleOptionType>({
    label: 'Exponential Model',
    value: 'Exponential Model',
  });

  const [kOption, setKOption] = useState<SingleOptionType>({
    label: 'Log Range',
    value: 'Log Range',
  });

  const [resultsSummary, setResultsSummary] = useState<JSX.Element | null>(null);
  const [chartOptions, setChartOptions] = useState({});

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

  /** constructExponentialChart
   *
   * Create visual for Exponential model
   *
   * @param {DemandResult} obj
   */
  function constructExponentialChart(obj: DemandResult): void {
    const lowestPrice = Math.min(...obj.X);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    let dataForPlotting: any[] = [];
    let dataPointsForPlotting: any[] = [];

    let lowestDemand = -1;

    newPrices.forEach((price) => {
      const demand = renderExponentialDemand(obj.Q0, obj.Alpha, obj.K, price);

      lowestDemand = demand;

      dataForPlotting.push({
        Price: price,
        Demand: demand,
      });
    });

    obj.X.forEach((x, index) => {
      dataPointsForPlotting.push({
        x: x,
        y: obj.Y[index],
      });
    });

    setChartOptions({
      chart: {
        height: '600px',
      },
      title: {
        text: 'Demand Curve Modeling',
      },
      series: [
        {
          name: 'Predicted Demand',
          data: dataForPlotting.map((obj) => {
            return {
              x: obj.Price,
              y: obj.Demand,
            };
          }),
          type: 'line',
        },
        {
          name: 'Consumption',
          data: dataPointsForPlotting,
          label: 'Raw Data',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(0,0,0,1)',
          borderColor: 'rgba(0,0,0,0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: '#000',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBorderColor: 'rgba(0,0,0,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
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
          text: 'Demand (Log Scale)',
        },
        type: 'logarithmic',
        min: lowestDemand - 0.1,
      },
      xAxis: {
        title: {
          text: 'Unit Price',
        },
        type: 'logarithmic',
      },
    });
  }

  /** constructExponentiatedChart
   *
   * Create visual for Exponentiated model
   *
   * @param {DemandResult} obj
   */
  function constructExponentiatedChart(obj: DemandResult) {
    const lowestPrice = Math.min(...obj.X);
    const lowestConsumption = Math.min(...obj.Y);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    let dataForPlotting: any[] = [];
    let dataPointsForPlotting: any[] = [];

    let lowestDemand = -1;

    newPrices.forEach((price) => {
      const demand = renderExponentiatedDemand(obj.Q0, obj.Alpha, obj.K, price);

      lowestDemand = demand;

      dataForPlotting.push({
        Price: price,
        Demand: demand,
      });
    });

    lowestDemand = lowestDemand < lowestConsumption ? lowestDemand : lowestConsumption;

    obj.X.forEach((x, index) => {
      dataPointsForPlotting.push({
        x: x,
        y: obj.Y[index],
      });
    });

    setChartOptions({
      chart: {
        height: '600px',
      },
      title: {
        text: 'Demand Curve Modeling (Exponentiated)',
      },
      series: [
        {
          name: 'Predicted Demand',
          data: dataForPlotting.map((obj) => {
            return {
              x: obj.Price,
              y: obj.Demand,
            };
          }),
          type: 'line',
        },
        {
          name: 'Consumption',
          data: dataPointsForPlotting,
          label: 'Raw Data',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(0,0,0,1)',
          borderColor: 'rgba(0,0,0,0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: '#000',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBorderColor: 'rgba(0,0,0,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
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
          text: 'Demand (Linear Scale)',
        },
        min: lowestDemand,
      },
      xAxis: {
        title: {
          text: 'Unit Price',
        },
        type: 'logarithmic',
      },
    });
  }

  /** constructIHS3Chart
   *
   * Create visual for Exponentiated model
   *
   * @param {DemandResult} obj
   */
  function constructIHS3Chart(obj: DemandResult) {
    const lowestPrice = Math.min(...obj.X);
    const lowestConsumption = Math.min(...obj.Y);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    let dataForPlotting: any[] = [];
    let dataPointsForPlotting: any[] = [];

    let lowestDemand = -1;

    newPrices.forEach((price) => {
      const demand = unIHS(renderIHS3Demand(obj.Q0, obj.Alpha, obj.K, price));

      lowestDemand = demand;

      dataForPlotting.push({
        Price: price,
        Demand: demand,
      });
    });

    lowestDemand = lowestDemand < lowestConsumption ? lowestDemand : lowestConsumption;

    obj.X.forEach((x, index) => {
      dataPointsForPlotting.push({
        x: x,
        y: unIHS(obj.Y[index]),
      });
    });

    setChartOptions({
      chart: {
        height: '600px',
      },
      title: {
        text: 'Demand Curve Modeling (ZBE)',
      },
      series: [
        {
          name: 'Predicted Demand',
          data: dataForPlotting.map((obj) => {
            return {
              x: obj.Price,
              y: obj.Demand,
            };
          }),
          type: 'line',
        },
        {
          name: 'Consumption',
          data: dataPointsForPlotting,
          label: 'Raw Data',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(0,0,0,1)',
          borderColor: 'rgba(0,0,0,0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: '#000',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBorderColor: 'rgba(0,0,0,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
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
          text: 'Demand (IHS Scale)',
        },
        min: lowestDemand,
      },
      xAxis: {
        title: {
          text: 'Unit Price',
        },
        type: 'logarithmic',
      },
    });
  }

  /** constructIHS32hart
   *
   * Create visual for Exponentiated model
   *
   * @param {DemandResult} obj
   */
  function constructIHS2Chart(obj: DemandResult) {
    const lowestPrice = Math.min(...obj.X);
    const lowestConsumption = Math.min(...obj.Y);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = Array.from({ length: density }, (v, k) => k + delta);

    let dataForPlotting: any[] = [];
    let dataPointsForPlotting: any[] = [];

    let lowestDemand = -1;

    newPrices.forEach((price) => {
      const demand = unIHS(renderIHS2Demand(obj.Q0, obj.Alpha, price));

      lowestDemand = demand;

      dataForPlotting.push({
        Price: price,
        Demand: demand,
      });
    });

    obj.X.forEach((x, index) => {
      dataPointsForPlotting.push({
        x: x,
        y: unIHS(obj.Y[index]),
      });
    });

    lowestDemand = lowestDemand < lowestConsumption ? lowestDemand : lowestConsumption;

    setChartOptions({
      chart: {
        height: '600px',
      },
      title: {
        text: 'Demand Curve Modeling (ZBE)',
      },
      series: [
        {
          name: 'Predicted Demand',
          data: dataForPlotting.map((obj) => {
            return {
              x: obj.Price,
              y: obj.Demand,
            };
          }),
          type: 'line',
        },
        {
          name: 'Consumption',
          data: dataPointsForPlotting,
          label: 'Raw Data',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(0,0,0,1)',
          borderColor: 'rgba(0,0,0,0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBackgroundColor: '#000',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,0,0,1)',
          pointHoverBorderColor: 'rgba(0,0,0,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
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
          text: 'Demand (IHS Scale)',
        },
        min: lowestDemand,
      },
      xAxis: {
        title: {
          text: 'Unit Price',
        },
        type: 'logarithmic',
      },
    });
  }

  /**
   * loadExampleData
   */
  function loadExampleData(): void {
    setHotData([
      ['0.1', '1000'],
      ['0.5', '900'],
      ['1.0', '850'],
      ['1.5', '800'],
      ['2.0', '750'],
      ['2.5', '600'],
      ['3.0', '500'],
      ['4.0', '400'],
      ['5.0', '300'],
      ['10.0', '200'],
      ['15.0', '150'],
      ['20.0', '100'],
      ['50.0', '0'],
    ]);
  }

  /** calculateDemand
   *
   * Fire off worker
   *
   */
  function calculateDemand(): void {
    if (worker !== undefined) {
      return;
    }

    const thing = hotData;

    var mX = [];
    var mY = [];

    for (var i = 0; i < thing!.length; i++) {
      var temp = thing![i];

      const passCheck = isValidNumber(temp[0]) && isValidNumber(temp[1]);

      if (modelOption.value === 'Exponential Model' && parseFloat(temp[1]) <= 0) {
        continue;
      }

      if (passCheck) {
        mX.push(temp[0]);
        mY.push(temp[1]);
      }
    }

    if (mX.length < 3 || mY.length < 3) {
      alert('Please enter more prices.');

      setRunningCalculation(false);

      return;
    }

    worker = new Worker('./workers/worker_demand.js');
    worker.onmessage = handleWorkerOutput;

    worker.postMessage({
      maxIterations: 1000,
      x: mX,
      y: mY,
      model: modelOption.value,
      KFit: kOption.value,
      KValue: -1,
    });
  }

  /** handleWorkerOutput
   *
   * Receiver from worker
   *
   * @param {WorkerOutput} obj
   */
  function handleWorkerOutput(obj: any): void {
    const data = obj.data as DemandResult;

    if (data == null) {
      return;
    }

    if (data.done) {
      worker = undefined;

      setRunningCalculation(false);
      setResultsSummary(generateSummaryFromResults(data));

      switch (data.Model) {
        case 'Exponential Model':
          constructExponentialChart(data);
          break;

        case 'Exponentiated Model':
          constructExponentiatedChart(data);
          break;

        case 'Zero-bounded Model (with K)':
          constructIHS3Chart(data);
          break;

        case 'Zero-bounded Model (no K)':
          constructIHS2Chart(data);
          break;
      }

      return;
    }
  }

  /** reportKNumbers
   *
   * @param {DemandResult} data results
   * @returns
   */
  function reportKNumbers(data: DemandResult): JSX.Element {
    if (data.Model !== 'Zero-bounded Model (no K)') {
      return (
        <>
          <b>K ({data.FitK}):</b> {data.SetK.toFixed(3)} <br />
        </>
      );
    }
    return <></>;
  }

  /** generateSummaryFromResults
   *
   * Construct text output
   *
   * @param {DemandResult} data message from worker
   * @returns {JSX.Element}
   */
  function generateSummaryFromResults(data: DemandResult): JSX.Element {
    return (
      <p>
        <b>Alpha:</b> {data.Params[1].toFixed(8)} <br />
        <b>Q0:</b> {data.Params[0].toFixed(8)} <br />
        {reportKNumbers(data)}
        <b>
          P<sub>MAX</sub> (Analytic):
        </b>{' '}
        {data.PmaxA.toFixed(3)} <br />
        <b>
          O<sub>MAX</sub> (Analytic):
        </b>{' '}
        {data.OmaxA.toFixed(3)} <br />
        <b>RMS Error:</b> {data.MSE.toFixed(8)} <br />
        <b>Avg Error:</b> {data.RMSE.toFixed(8)}
      </p>
    );
  }

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Demand Curve Analyzer</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="toolsDescription">
                The Demand Curve Analyzer is designed to assist clinicians and researchers in
                conducting behavior economic analyses while also providing more accessible options
                for these calculations. Demand Curve Analyzer fits respective parameters using
                differential evolution, a robust metaheuristic process for optimizing model
                performance. At present, only a single series may be fitted at a time. All methods
                are performed "behind the scenes", faciliating model fitting while retaining a
                simple, spreadsheet-based interface. This project is fully open-sourced under a
                GPL-license (v3) and all source code is completely available.
                <br />
                <br />
                <b>Based on the following works:</b>
                <br />
                Gilroy, S. P., Kaplan, B. A., Reed, D. D., Koffarnus, M. N. & Hantula, D. A. (2018).
                The Demand Curve Analyzer: Behavioral economic software for applied researchers.
                Journal of the Experimental Analysis of Behavior, 110(3), 553-568.{' '}
                <a href="https://doi.org/10.1002/jeab.479">10.1002/jeab.479</a>.
                <br />
                <br />
                Kaplan, B. A., Gilroy, S. P., Reed, D. D., Koffarnus, M. N., & Hursh, S. R. (2019).
                The R package beezdemand: behavioral economic easy demand. Perspectives on Behavior
                Science, 42(1), 163-180.{' '}
                <a href="https://doi.org/10.1007/s40614-018-00187-7">10.1007/s40614-018-00187-7</a>.
                <br />
                <br />
                Gilroy, S.P., Kaplan, B.A., Reed, D.D., Hantula, D.A., &#38; Hursh, S. R. (2019). An
                Exact Solution for Unit Elasticity in the Exponential Model of Demand.{' '}
                <i>Journal of Experimental and Clinical Psychopharmacology, 27(6)</i>, 588-597. doi:{' '}
                <a href="https://psycnet.apa.org/doi/10.1037/pha0000268">10.1037/pha0000268</a>.
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
              <MDBCardTitle>Demand Curve Analyzer</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                This web-app automates the fitting of the Exponential, Exponentiated, and the
                Zero-bounded Exponential models of operant demand (with the Exponential model as the
                default). <br />
                <br />
                Demand curve analysis is performed by providing least 3 pairs (x and y) of Pricing
                and Consumption data in the control below. At least three pairs of data are
                necessary to perform any type of modeling (at the extreme minimum). <br />
                <br />
                Prices (x) and Consumption (y) values can be any positive real number (i.e., greater
                or equal to 0), depending on model of course.
              </MDBCardText>

              <MDBBtn
                noRipple
                style={{
                  width: '100%',
                }}
                tag="a"
                href="#!"
                className="button-fit-card"
                disabled={runningCalculation}
                onClick={() => loadExampleData()}
              >
                Load Example Data
              </MDBBtn>

              <HotTable
                data={hotData}
                colHeaders={true}
                rowHeaders={true}
                style={{ marginTop: '25px' }}
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
                <HotColumn title="Price/Unit Price" />
                <HotColumn title="Consumption" />
              </HotTable>

              <label style={{ width: '100%', marginTop: '25px' }}>
                <span>Modeling Option:</span>
                <Select
                  options={ModelOptions}
                  onChange={(option) => {
                    setModelOption(option!);

                    if (option!.value.includes('Zero')) {
                      setKOptionsAvailable([
                        { label: 'Fit as Parameter', value: 'Fit as Parameter' },
                      ]);

                      setKOption({ label: 'Fit as Parameter', value: 'Fit as Parameter' });
                    } else {
                      setKOptionsAvailable([
                        { label: 'Log Range', value: 'Log Range' },
                        { label: 'Fit as Parameter', value: 'Fit as Parameter' },
                      ]);
                    }
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

              <label style={{ width: '100%' }}>
                <span>Scaling parameter (K) Value:</span>
                <Select
                  options={kOptionsAvailable}
                  onChange={(option) => {
                    setKOption(option!);
                  }}
                  value={kOption}
                  menuPlacement="auto"
                  menuPosition="fixed"
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
                className="button-fit-card"
                onClick={() => {
                  setRunningCalculation(true);
                  calculateDemand();
                }}
              >
                Calculate
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard className="outputPanel">
            <MDBCardBody>
              <MDBCardTitle>Fitting Results</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}></MDBCardText>
              {resultsSummary !== null && resultsSummary}
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
