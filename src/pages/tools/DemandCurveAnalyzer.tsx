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
import { SingleOptionType } from './types/GeneralTypes';
import { isValidNumber } from './helpers/GeneralHelpers';

import './styles/Tools.css';
import { handleDemandWorkerOutput } from './helpers/DemandCharting';

const ModelOptions: SingleOptionType[] = [
  { label: 'Exponential Model', value: 'Exponential Model' },
  { label: 'Exponentiated Model', value: 'Exponentiated Model' },
  { label: 'Zero-bounded Model (with K)', value: 'Zero-bounded Model (with K)' },
  { label: 'Zero-bounded Model (no K)', value: 'Zero-bounded Model (no K)' },
];

export default function DemandCurveAnalyzer(): JSX.Element {
  const [hotData, setHotData] = useState<string[][]>();
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
    if (hotData === null || hotData === undefined) {
      return;
    }

    const thing = hotData;

    const mX = [];
    const mY = [];

    for (let i = 0; i < thing.length; i++) {
      const temp = thing[i];

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

    worker = new Worker('https://sqab.org/workers/worker_demand2.js');
    worker.onmessage = (ev: MessageEvent<any>) => {
      handleDemandWorkerOutput({
        ev, worker, setRunningCalculation,
        setResultsSummary, setChartOptions
      });
    };

    worker.postMessage({
      maxIterations: 1000,
      x: mX,
      y: mY,
      model: modelOption.value,
      KFit: kOption.value,
      KValue: -1,
    });
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
                are performed &quot;behind the scenes&quot;, faciliating model fitting while
                retaining a simple, spreadsheet-based interface. This project is fully open-sourced
                under a GPL-license (v3) and all source code is completely available.
                <br />
                <br />
                <b>Based on the following works:</b>
                <br />
                Hursh, S. R., & Silberberg, A. (2008). Economic demand and essential value.
                <i>Psychological Review, 115(1)</i>, 186-198. doi:{' '}
                <a href="https://psycnet.apa.org/doi/10.1037/0033-295X.115.1.186">
                  10.1037/0033-295X.115.1.186
                </a>
                <br />
                <br />
                Koffarnus, M. N., Franck, C. T., Stein, J. S., & Bickel, W. K. (2015). A modified
                exponential behavioral economic demand model to better describe consumption data.
                <i>Experimental and clinical psychopharmacology, 23(6)</i>, 504-512. doi:{' '}
                <a href="https://doi.org/10.1037%2Fpha0000045">10.1037/pha0000045</a>
                <br />
                <br />
                Gilroy, S. P., Kaplan, B. A., Reed, D. D., Koffarnus, M. N. & Hantula, D. A. (2018).
                The Demand Curve Analyzer: Behavioral economic software for applied researchers.
                <i>Journal of the Experimental Analysis of Behavior, 110(3)</i>, 553-568. doi:{' '}
                <a href="https://doi.org/10.1002/jeab.479">10.1002/jeab.479</a>.
                <br />
                <br />
                Kaplan, B. A., Gilroy, S. P., Reed, D. D., Koffarnus, M. N., & Hursh, S. R. (2019).
                The R package beezdemand: behavioral economic easy demand.{' '}
                <i>Perspectives on Behavior Science, 42(1)</i>, 163-180.{' '}
                <a href="https://doi.org/10.1007/s40614-018-00187-7">10.1007/s40614-018-00187-7</a>.
                <br />
                <br />
                Gilroy, S.P., Kaplan, B.A., Reed, D.D., Hantula, D.A., &#38; Hursh, S. R. (2019). An
                Exact Solution for Unit Elasticity in the Exponential Model of Demand.{' '}
                <i>Journal of Experimental and Clinical Psychopharmacology, 27(6)</i>, 588-597. doi:{' '}
                <a href="https://psycnet.apa.org/doi/10.1037/pha0000268">10.1037/pha0000268</a>.
                <br />
                <br />
                Gilroy, S. P., Kaplan, B. A., Schwartz, L. P., Reed, D. D., & Hursh, S. R. (2021). A
                zero-bounded model of operant demand.{' '}
                <i>Journal of the Experimental Analysis of Behavior, 115(3)</i>, 729-746. doi:{' '}
                <a href="https://doi.org/10.1002/jeab.679">10.1002/jeab.679</a>.
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

              <label style={{ width: '100%', marginTop: '25px' }} htmlFor="framework-field">Modeling Option:</label>
              <Select
                name={"framework-field"}
                inputId={"framework-field"}
                options={ModelOptions}
                onChange={(option) => {
                  if (option) {
                    setModelOption(option);
                    setChartOptions({})

                    if (option.value.includes('Zero')) {
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

              {modelOption !== ModelOptions[3] && (
                <>
                  <label style={{ width: '100%' }} htmlFor="span-field">Scaling parameter (K) Value:</label>
                  <Select
                    name={"span-field"}
                    inputId={"span-field"}
                    options={kOptionsAvailable}
                    onChange={(option) => {
                      if (option) {
                        setKOption(option);
                      }
                    }}
                    value={kOption}
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                </>
              )}


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
