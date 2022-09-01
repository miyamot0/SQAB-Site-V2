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
 import Highcharts from "highcharts";
 import HighchartsReact from "highcharts-react-official";
 
 import { CardBodyTextStyle } from '../../utilities/StyleHelper';
 import './Tools.css';
 
interface DiscountingFit {
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

 interface DiscountingResult {
    done: boolean;
    results: DiscountingFit[];
 }

 /*
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
 */
 
 type SingleOptionType = { label: string; value: string };
 
 const ModelOptions: SingleOptionType[] = [
   { label: 'Do Not Bound', value: 'Do Not Bound' },
   { label: 'Drop if S > 1', value: 'Drop if S > 1' },
 ];
 
 function unIHS(x: number): number {
   return 1/Math.pow(10, (1 * x))*(Math.pow(10, (2 * x))-1);
 }
 
 function ihsTransform(x: number): number {
   return Math.log(0.5*x + Math.sqrt((Math.pow(0.5, 2)) * (Math.pow(x, 2))+1))/Math.log(10);
 }
 
 export default function DiscountingModelSelector(): JSX.Element {
   const [hotData, setHotData] = useState<any[][]>();
   const [runningCalculation, setRunningCalculation] = useState<boolean>(false);
 
   const [modelOption, setModelOption] = useState<SingleOptionType>({ label: 'Do Not Bound', value: 'Do Not Bound' },);
 
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
   /*
   function constructExponentialChart(obj: DemandResult): void
   {
     const lowestPrice = Math.min(...obj.X);
     const highestPrice = Math.max(...obj.X) + 1;
     const density = 100;
     const rangeP = highestPrice - lowestPrice;
     const delta = rangeP / density;
 
     const newPrices = [0.1, ...Array.from({length:density},(v,k)=>k+delta)]
 
     let dataForPlotting: any[] = [];
     let dataPointsForPlotting: any[] = [];
 
     let lowestDemand = -1;
 
     newPrices.forEach((price) => {
       const demand = renderExponentialDemand(obj.Q0, obj.Alpha, obj.K, price)
 
       lowestDemand = demand;
 
       dataForPlotting.push({
         Price: price,
         Demand: demand
       })
     });
 
     obj.X.forEach((x, index) => {
       dataPointsForPlotting.push({
         x: x,
         y: obj.Y[index]
       })
     });
 
     setChartOptions({
       chart: {
         height: "600px",
       },
       title: {
         text: "Demand Curve Modeling",
       },
       series: [{
         name: "Predicted Demand",
         data: dataForPlotting.map((obj) => {
           return {
             x: obj.Price,
             y: obj.Demand
           };
         }),
         type: "line",
       },
       {
         name: "Consumption",
         data: dataPointsForPlotting,
         label: 'Raw Data',
         fill: false,
         lineTension: 0,
         backgroundColor: "rgba(0,0,0,1)",
         borderColor: "rgba(0,0,0,0)",
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderWidth: 1,
         borderJoinStyle: 'miter',
         pointBorderColor: "rgba(0,0,0,1)",
         pointBackgroundColor: "#000",
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         pointHoverBackgroundColor: "rgba(0,0,0,1)",
         pointHoverBorderColor: "rgba(0,0,0,1)",
         pointHoverBorderWidth: 2,
         pointRadius: 5,
         pointHitRadius: 10,
         spanGaps: false,
         lineWidth: 0,
         lineWidthPlus: 0,
         states: {
           hover: {
               enabled: false
           }
         }
       }    
     ],
       yAxis: {
         title: {
           text: "Demand (Log Scale)",
         },
         type: 'logarithmic',
         min: lowestDemand - 0.1,
       },
       xAxis: {
         title: {
           text: "Unit Price"
         },
         type: 'logarithmic',
       }
     });
   }
   */
 
   /**
    * loadExampleData
    */
   function loadExampleData(): void {
     setHotData([
       ['1',     '1.0'],
       ['30',    '0.9'],
       ['180',   '0.8'],
       ['540',   '0.7'],
       ['1080',  '0.6'],
       ['2160',  '0.5'],
       ['4320',  '0.4'],
       ['8640',  '0.3'],
       ['17280', '0.2'],
       ['', ''],
       ['', ''],
       ['', ''],
     ]);
   }
 
   /** isValidNumber
    * 
    * Confirm that values are legit numbers
    * 
    * @param {string} num number string
    * @returns {boolean} is a valid num or no
    */
   function isValidNumber(num: string): boolean {
     // get rid of empties
     if (num.trim().length === 0) return false;
 
     // TODO: fix this logic
     if (parseFloat(num.trim()) < 0) return false;
 
     if (parseFloat(num.trim()) === 0) return true;

     if (num.trim() === '0') return true;
 
     return num.trim().length > 1 && !isNaN(parseFloat(num));
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
 
    var rachlinBounding = modelOption.value !== "Do not Bound";

    console.log(mX)
    console.log(mY)

     worker.postMessage(
     {
        boundRachlin: rachlinBounding,
        maxIterations: 500,
        x: mX,
        y: mY
     });
     /*
 
 
     worker.postMessage({
       maxIterations: 1000,
       x: mX,
       y: mY,
       model: modelOption.value,
       KFit: kOption.value,
       KValue: -1,
     });
     */
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

            console.log(obj)
    
        }

    /*
     const data = obj.data as DemandResult;
 
     if (data == null) {
       return;
     }
 
     if (data.done) {
       worker = undefined;
 
       setRunningCalculation(false);
       setResultsSummary(generateSummaryFromResults(data));
 
       switch (data.Model) {
         case "Exponential Model":
           constructExponentialChart(data);
           break;
 
         case "Exponentiated Model":
           constructExponentiatedChart(data);
           break;
 
         case "Zero-bounded Model (with K)":
           constructIHS3Chart(data);
           break;
 
         case "Zero-bounded Model (no K)":
           constructIHS2Chart(data);
           break;
           
       }
 
       return;
     }
     */
   }
 
   /** renderExponentialDemand
    *
    * Project demand at instance
    *
    * @param {number} Q q0
    * @param {number} A a
    * @param {number} K k
    * @param {number} x pmax
    * @returns {number} projected level of demand
    */
   function renderExponentialDemand(Q: number, A: number, K: number, x: number): number {
     return Math.log(Q) / Math.log(10) + K * (Math.exp(-A * Q * x) - 1);
   }
 
   /** renderExponentiatedDemand
    *
    * Project demand at instance
    *
    * @param {number} Q q0
    * @param {number} A a
    * @param {number} K k
    * @param {number} x pmax
    * @returns {number} projected level of demand
    */
    function renderExponentiatedDemand(Q: number, A: number, K: number, x: number): number {
     return Q * Math.pow(10, (K * (Math.exp(-A * Q * x) - 1)));
   }
 
   /** renderIHS3Demand
    *
    * Project demand at instance
    *
    * @param {number} Q q0
    * @param {number} A a
    * @param {number} K k
    * @param {number} x pmax
    * @returns {number} projected level of demand
    */
    function renderIHS3Demand(Q: number, A: number, K: number, x: number): number {
     return ihsTransform(Q) + K * (Math.exp(-A * Q * x) - 1);
   }
 
   /** renderIHS3Demand
    *
    * Project demand at instance
    *
    * @param {number} Q q0
    * @param {number} A a
    * @param {number} x pmax
    * @returns {number} projected level of demand
    */
    function renderIHS2Demand(Q: number, A: number, x: number): number {
     return ihsTransform(Q) * (Math.exp(-(A/ihsTransform(Q)) * Q * x));
   }
 
   /** reportKNumbers
    * 
    * @param {DemandResult} data results
    * @returns 
    */
   function reportKNumbers(data: DiscountingResult): JSX.Element {
     //if ( data.Model !== "Zero-bounded Model (no K)") {
     //  return <><b>K ({data.FitK}):</b> {data.SetK.toFixed(3)} <br /></>;
     //}
     return <></>;
   }
 
   /** generateSummaryFromResults
    *  
    * Construct text output
    * 
    * @param {DemandResult} data message from worker
    * @returns {JSX.Element}
    */
   function generateSummaryFromResults(data: DiscountingResult): JSX.Element {
    return <></>;
    /*
     return (
       <p>
         <b>Alpha:</b> {data.Params[1].toFixed(8)} <br />
         <b>Q0:</b> {data.Params[0].toFixed(8)} <br />
         {reportKNumbers(data)}
         <b>P<sub>MAX</sub> (Analytic):</b> {data.PmaxA.toFixed(3)} <br />
         <b>O<sub>MAX</sub> (Analytic):</b> {data.OmaxA.toFixed(3)} <br />
         <b>RMS Error:</b> {data.MSE.toFixed(8)} <br />
         <b>Avg Error:</b> {data.RMSE.toFixed(8)}
       </p>
     );
     */
   }
 
   return (
     <>
       <MDBRow center className="row-eq-height">
         <MDBCol sm="8">
           <MDBCard>
             <MDBCardBody>
               <MDBCardTitle>Discounting Model Selector</MDBCardTitle>
               <MDBCardText style={CardBodyTextStyle}>
               The Discounting Model Selector (Web) is a web-based tool for applying approximate Bayesian model selection for delay discounting applications. This program allows researchers and clinicians with to perform an empirical comparison of Discounting models for individual series of data. This method has been simplified by Discounting Model Selector through the use of an easy-to-use interface resembling common spreadsheet software. At present, the online version of the DMS is performed with only one discounting series at a time.
                 <br />
                 <br />
                 <b>Published:</b>
                 <br />
                 Gilroy, S. P. & Hantula, D. A. (2018). Discounting model selection with area-based measures: A case for numerical integration. Journal of the Experimental Analysis of Behavior.{' '}
                 <a href="https://doi.org/10.1002/jeab.318">doi: 10.1002/jeab.318</a>.
                 <br />
                 Gilroy, S. P., Franck, C. T. & Hantula, D. A. (2017). The discounting model selector: Statistical software for delay discounting applications. Journal of the Experimental Analysis of Behavior, 107(3), 388-401.{' '}
                 <a href="https://doi.org/10.1002/jeab.257">doi: 10.1002/jeab.257</a>.
                 <br />
                 Franck, C. T., Koffarnus, M. N., House, L. L., & Bickel, W. K. (2015). Accurate characterization of delay discounting: a multiple model approach using approximate Bayesian model selection and a unified discounting measure. Journal of the Experimental Analysis of Behavior, 103(1), 218-233. https://doi.org/10.1002/jeab.128.{' '}
                 <a href="https://doi.org/10.1002/jeab.128">doi: 10.1002/jeab.128</a>.
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
               This tool automates discounting model fitting, Approximate Bayesian Model Selection, model selection, and calculation of the Effective Delay 50 (ED50).
               <br>
               </br>
               To perform model selection, input at least 3 pairs (x and y) of discounting data. At least three pairs of data are necessary to proceed.
               <br>
               </br>
               Delay values (x) can be any number, though values must be between 0-1. This should be calculated as a proportion (i.e., the Y value divided by the Maximum Value). Any higher numbers will prevent you from proceeding.
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
 