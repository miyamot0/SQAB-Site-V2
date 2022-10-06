/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { DemandResult, DemandXYPoints, PlotXYPoints } from "../types/DemandTypes";
import { renderExponentialDemand, renderExponentiatedDemand, renderIHS2Demand, renderIHS3Demand, unIHS } from "./DemandHelpers";

/** constructExponentialChart
 *
 * Create visual for Exponential model
 *
 * @param {DemandResult} obj
 */
export function constructExponentialChart(obj: DemandResult, setChartOptions: any): void {
    const lowestPrice = Math.min(...obj.X);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    const dataForPlotting: DemandXYPoints[] = [];
    const dataPointsForPlotting: PlotXYPoints[] = [];

    newPrices.forEach((price) => {
        const demand = renderExponentialDemand(obj.Q0, obj.Alpha, obj.K, price);

        dataForPlotting.push({
            Price: price,
            Demand: demand,
        });
    });

    obj.X.forEach((x, index) => {
        if (x > 0 && obj.Y[index] > 0) {
            dataPointsForPlotting.push({
                x: x,
                y: obj.Y[index],
            });
        }
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
                text: 'Demand (Log10 Units)',
            },
            //type: 'logarithmic',
            min: 0,
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
export function constructExponentiatedChart(obj: DemandResult, setChartOptions: any) {
    const lowestPrice = Math.min(...obj.X);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    const dataForPlotting: DemandXYPoints[] = [];
    const dataPointsForPlotting: PlotXYPoints[] = [];

    newPrices.forEach((price) => {
        const demand = renderExponentiatedDemand(obj.Q0, obj.Alpha, obj.K, price);

        dataForPlotting.push({
            Price: price,
            Demand: demand,
        });
    });

    obj.X.forEach((x, index) => {
        if (x > 0 && obj.Y[index] > 0) {
            dataPointsForPlotting.push({
                x: x,
                y: obj.Y[index],
            });
        }
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
                text: 'Demand (Linear Units)',
            },
            min: 0,
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
export function constructIHS3Chart(obj: DemandResult, setChartOptions: any) {
    const lowestPrice = Math.min(...obj.X);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    const dataForPlotting: DemandXYPoints[] = [];
    const dataPointsForPlotting: PlotXYPoints[] = [];

    newPrices.forEach((price) => {
        const demand = unIHS(renderIHS3Demand(obj.Q0, obj.Alpha, obj.K, price));

        dataForPlotting.push({
            Price: price,
            Demand: demand,
        });
    });

    obj.X.forEach((x, index) => {
        if (x > 0 && unIHS(obj.Y[index]) > 0) {
            dataPointsForPlotting.push({
                x: x,
                y: unIHS(obj.Y[index]),
            });
        }
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
                text: 'Demand (Linear Units)',
            },
            min: 0,
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
export function constructIHS2Chart(obj: DemandResult, setChartOptions: any) {
    const lowestPrice = Math.min(...obj.X);
    const highestPrice = Math.max(...obj.X) + 1;
    const density = 100;
    const rangeP = highestPrice - lowestPrice;
    const delta = rangeP / density;

    const newPrices = [0.1, ...Array.from({ length: density }, (v, k) => k + delta)];

    const dataForPlotting: DemandXYPoints[] = [];
    const dataPointsForPlotting: PlotXYPoints[] = [];

    newPrices.forEach((price) => {
        const demand = unIHS(renderIHS2Demand(obj.Q0, obj.Alpha, price));

        dataForPlotting.push({
            Price: price,
            Demand: demand,
        });
    });

    obj.X.forEach((x, index) => {
        if (x > 0 && unIHS(obj.Y[index]) > 0) {
            dataPointsForPlotting.push({
                x: x,
                y: unIHS(obj.Y[index]),
            });
        }
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
                text: 'Demand (Linear Units)',
            },
            min: 0,
        },
        xAxis: {
            title: {
                text: 'Unit Price',
            },
            type: 'logarithmic',
        },
    });
}

export interface handleDemandWorkerOutput {
    ev: MessageEvent<any>;
    worker: Worker | undefined;
    setRunningCalculation: any;
    setResultsSummary: any;
    setChartOptions: any;
}

/** handleWorkerOutput
 *
 * Receiver from worker
 *
 * @param {WorkerOutput} obj
 */
export function handleDemandWorkerOutput({ ev, worker, setRunningCalculation,
    setResultsSummary, setChartOptions }: handleDemandWorkerOutput): void {
    const data = ev.data as DemandResult;

    if (data == null) {
        return;
    }

    if (data.done) {
        worker = undefined;

        setRunningCalculation(false);
        setResultsSummary(generateSummaryFromResults(data));

        switch (data.Model) {
            case 'Exponential Model':
                constructExponentialChart(data, setChartOptions);
                break;

            case 'Exponentiated Model':
                constructExponentiatedChart(data, setChartOptions);
                break;

            case 'Zero-bounded Model (with K)':
                constructIHS3Chart(data, setChartOptions);
                break;

            case 'Zero-bounded Model (no K)':
                constructIHS2Chart(data, setChartOptions);
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