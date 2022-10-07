/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Highcharts from 'highcharts';
import highchartsAccessibility from "highcharts/modules/accessibility";
highchartsAccessibility(Highcharts);
import HighchartsReact from 'highcharts-react-official';
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
import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { ModelOptions } from './types/DiscountingTypes';
import { isValidNumber } from './helpers/GeneralHelpers';
import { SingleOptionType } from './types/GeneralTypes';
import { handleDiscountingWorkerOutput, InitialDiscountingChartState } from './helpers/DiscountingCharting';

import './styles/Tools.css';

export default function DiscountingModelSelector(): JSX.Element {
  const [hotData, setHotData] = useState<any[][]>();
  const [runningCalculation, setRunningCalculation] = useState<boolean>(false);
  const [modelOption, setModelOption] = useState<SingleOptionType>({
    label: 'Do Not Bound',
    value: 'Do Not Bound',
  });
  const [buttonStatusMsg, setButtonStatusMsg] = useState<string>('Calculate');
  const [resultsSummary, setResultsSummary] = useState<JSX.Element[]>([]);
  const [chartOptions, setChartOptions] = useState(InitialDiscountingChartState);

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
    const thing = hotData;

    if (thing === null || thing === undefined) {
      return;
    }

    const mX = [];
    const mY = [];

    for (let i = 0; i < thing.length; i++) {
      const temp = thing[i];

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

    worker = new Worker('https://sqab.org/workers/worker_discounting.js');
    worker.onmessage = (ev: MessageEvent<any>) => {
      handleDiscountingWorkerOutput({
        ev, worker, setRunningCalculation, setResultsSummary,
        setButtonStatusMsg, setChartOptions
      });
    };

    worker.postMessage({
      boundRachlin: modelOption.value !== 'Do not Bound',
      maxIterations: 500,
      x: mX,
      y: mY,
    });
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
                Bayesian model selection and a unified discounting measure.{' '}
                <i>Journal of the Experimental Analysis of Behavior, 103(1)</i>, 218-233.
                https://doi.org/10.1002/jeab.128.{' '}
                <a href="https://doi.org/10.1002/jeab.128">doi: 10.1002/jeab.128</a>.
                <br />
                <br />
                Gilroy, S. P., Franck, C. T. &#38; Hantula, D. A. (2017). The discounting model
                selector: Statistical software for delay discounting applications.{' '}
                <i>Journal of the Experimental Analysis of Behavior, 107(3)</i>, 388-401.{' '}
                <a href="https://doi.org/10.1002/jeab.257">doi: 10.1002/jeab.257</a>.
                <br />
                <br />
                Gilroy, S. P. &#38; Hantula, D. A. (2018). Discounting model selection with
                area-based measures: A case for numerical integration.{' '}
                <i>Journal of the Experimental Analysis of Behavior, 109(2)</i>, 433-449.{' '}
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
                height="auto"
                stretchH="all"
                columnSorting={false}
                style={{ marginTop: '25px' }}
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

              <label style={{ width: '100%', marginTop: '25px' }} htmlFor="framework-field">Rachlin Behavior:</label>
              <Select
                name={"framework-field"}
                inputId={"framework-field"}
                options={ModelOptions}
                onChange={(option) => {
                  if (option) {
                    setModelOption(option);
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
