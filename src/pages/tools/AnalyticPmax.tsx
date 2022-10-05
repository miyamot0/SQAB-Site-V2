/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { WorkerPmaxResult } from './helpers/PmaxHelpers';
import { clearConsumptionData, loadExampleData } from './behavior/DemandBehavior';
import { round } from './helpers/GeneralHelpers';
import './styles/Tools.css';
import { HotTableThreeParam, HotTableThreeParamZBE, HotTableTwoParamZBE } from './views/HotTables';
import { ResultsHS, ResultsZBE2, ResultsZBE3 } from './views/DemandResults';

const ModelOptions = [
  { value: 'ZBE-2', label: '2-Parameter ZBE (no K)' },
  { value: 'ZBE-3', label: '3-Parameter ZBE (with K)' },
  { value: 'Exponentiated', label: 'Exponentiated Model' },
  { value: 'Exponential', label: 'Exponential Model' },
]

export default function AnalyticPmax(): JSX.Element {
  const [hotData, setHotData] = useState<string[][]>();
  const [hotData2, setHotData2] = useState<string[][]>();
  const [modelOption, setModelOption] = useState(ModelOptions[0])
  const [runningCalculation, setRunningCalculation] = useState<boolean>(false);

  let worker: Worker | undefined = undefined;

  useEffect(() => {
    setHotData([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ]);
  }, []);

  /** startPmaxWorker
   *
   */
  function startPmaxWorker(): void {
    if (worker !== undefined) {
      return;
    }

    worker = new Worker('./workers/worker_pmax.js');
    worker.onmessage = handleWorkerOutput;
    worker.postMessage({
      data: hotData,
      isZBE: modelOption.value.includes('ZBE'),
      hasTwoParams: modelOption.value.includes('ZBE-2')
    });
  }

  /** handleWorkerOutput
   *
   * @param {WorkerOutput} obj
   */
  function handleWorkerOutput(obj: any): void {
    const data = obj.data as WorkerPmaxResult;

    if (data.done && data.sheet) {
      worker = undefined;

      const pmaxRow = modelOption.value.includes("ZBE-2") ? 2 : 3;

      const trimmedPrecision = data.sheet.map((sheet) => {
        const iSheet = sheet;
        const pmaxValue = iSheet[pmaxRow].toString();

        if (pmaxValue.trim().length === 0) {
          return iSheet
        } else {
          iSheet[pmaxRow] = round(pmaxValue, 4);
          return iSheet
        }
      })

      setHotData(trimmedPrecision);
      setHotData2(data.sheet);

      setRunningCalculation(false);
      return;
    }
  }

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>
                Analytical P<sub>MAX</sub> Calculator
              </MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="toolsDescription">
                The Analytical P<sub>MAX</sub> Calculator is a web-based tool for determining the
                point of unit elasticity, or more literally, peak work. This calculator streamlines
                the determination of an exact (Analytic) unit elasticity (i.e., slope = -1) using a
                simple, copy-paste interface. This is a more accurate method of calculating P
                <sub>MAX</sub>, one free from the error of approximations. Both the Approximate and
                Exact (Analytic) P<sub>MAX</sub> measures are provided here, though the approximated
                value is presented here purely for historical purposes.
                <br />
                <br />
                <b>Based on the following works:</b>
                <br />
                Gilroy, S.P., Kaplan, B.A., Reed, D.D., Hantula, D.A., &#38; Hursh, S. R. (2019). An
                Exact Solution for Unit Elasticity in the Exponential Model of Demand.{' '}
                <i>Journal of Experimental and Clinical Psychopharmacology, 27(6)</i>, 588-597. doi:{' '}
                <a href="https://psycnet.apa.org/doi/10.1037/pha0000268">10.1037/pha0000268</a>.
                <br />
                <br />
                Gilroy, S. P., Kaplan, B. A., &#38; Reed, D. D. (2020). Interpretation (s) of
                elasticity in operant demand.{' '}
                <i>Journal of the Experimental Analysis of Behavior, 114(1)</i>, 106-115. doi:{' '}
                <a href="https://doi.org/10.1002/jeab.610">10.1002/jeab.610</a>.
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
              <MDBCardTitle>
                P<sub>MAX</sub> Calculator
              </MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="toolsDescription">
                This calculator evaluates models of operant demand (see{' '}
                <a href="https://psycnet.apa.org/doi/10.1037/0033-295X.115.1.186">
                  Hursh &#38; Silberberg, 2008
                </a>
                ) to determine a point where one log-unit increase in price corresponds to a one
                log-unit decrease in consumption, i.e., P<sub>MAX</sub>. This has be done using
                numerical approximations or through more computationally-exhaustive iterative
                methods, using the first order derivative, but newer exact solution (Analytic)
                methods now exist.
                <br />
                <br />
                To calculate exact solution P<sub>MAX</sub>, you may paste the fitted Q0, alpha, and
                K parameters from the model of demand into the spreadsheet component (in their
                respective columns). Once entered, simply press the &quot;Calculate&quot; button to
                calculate the Analytical P<sub>MAX</sub>.
                <br />
                <br />
                Optionally, you may preview this method using a sample data by pressing the
                &quot;Load Sample Data&quot; button and then pressing &quot;Calculate&quot;. This
                will let you view the differences between the Approximate and Analytical P
                <sub>MAX</sub>.
              </MDBCardText>

              <label style={{ width: '100%', marginTop: '25px' }}>
                <span>Select Implementation of Framework:</span>
                <Select
                  options={ModelOptions}
                  onChange={(option) => {
                    if (option) {
                      setModelOption(option);
                      clearConsumptionData({
                        setHotData,
                        hasTwoParameters: modelOption === ModelOptions[0]
                      })
                      setHotData2(undefined)
                    }
                  }}
                  value={modelOption}
                  styles={{
                    menu: (base) => ({
                      ...base,
                      width: 'max-content',
                      minWidth: '100%',
                      zIndex: 9999
                    }),
                  }}
                />
              </label>

              <MDBBtn
                noRipple
                style={{
                  width: '100%',
                  marginBottom: '25px',
                }}
                tag="a"
                href="#!"
                className="button-fit-card"
                disabled={runningCalculation}
                onClick={() => loadExampleData({
                  setHotData,
                  isZBE: modelOption.label.includes("ZBE"),
                  hasTwoParameters: modelOption === ModelOptions[0]
                })}
              >
                Load Example Data
              </MDBBtn>

              {modelOption === ModelOptions[0] ? <HotTableTwoParamZBE hotData={hotData} /> :
                modelOption === ModelOptions[1] ? <HotTableThreeParamZBE hotData={hotData} /> :
                  <HotTableThreeParam hotData={hotData} />
              }

              <MDBBtn
                noRipple
                style={{
                  width: '100%',
                  marginTop: '25px',
                }}
                tag="a"
                href="#!"
                className="button-fit-card"
                disabled={runningCalculation}
                onClick={() => {
                  if (!hotData || hotData[0][0].trim().length === 0 || hotData[0][1].trim().length === 0) {
                    return
                  } else {
                    setRunningCalculation(true);
                    startPmaxWorker();
                  }
                }}
              >
                Calculate
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          {modelOption === ModelOptions[0] ? <ResultsZBE2 hotData2={hotData2} /> :
            modelOption === ModelOptions[1] ? <ResultsZBE3 hotData2={hotData2} /> :
              <ResultsHS hotData2={hotData2} model={modelOption.value} />
          }
        </MDBCol>
      </MDBRow>
    </>
  );
}
