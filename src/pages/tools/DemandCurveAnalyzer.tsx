/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Select from 'react-select';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';

highchartsAccessibility(Highcharts);

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
import { handleDemandWorkerOutput } from './helpers/DemandCharting';
import { DemandHeading } from './views/DemandHeading';

import './styles/Tools.css';

const ModelOptions: SingleOptionType[] = [
  { label: 'Exponential Model', value: 'Exponential Model' },
  { label: 'Exponentiated Model', value: 'Exponentiated Model' },
  { label: 'Zero-bounded Model (with K)', value: 'Zero-bounded Model (with K)' },
  { label: 'Zero-bounded Model (no K)', value: 'Zero-bounded Model (no K)' },
];

export default function DemandCurveAnalyzer(): JSX.Element {
  const [hotData, setHotData] = useState<string[][]>([
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

    worker = new Worker('./workers/worker_demand.js');
    worker.onmessage = (ev: MessageEvent<any>) => {
      handleDemandWorkerOutput({
        ev,
        worker,
        setRunningCalculation,
        setResultsSummary,
        setChartOptions,
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
      <DemandHeading />

      <MDBRow center>
        <MDBCol sm='8'>
          <hr className='additional-margin' />
        </MDBCol>
      </MDBRow>

      <MDBRow center className='row-eq-height'>
        <MDBCol sm='4'>
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
                tag='a'
                href='#!'
                className='button-fit-card'
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
                height='auto'
                stretchH='all'
                columnSorting={false}
                columns={[
                  { data: 0, type: 'string' },
                  { data: 1, type: 'string' },
                ]}
                contextMenu={true}
                licenseKey='non-commercial-and-evaluation'
              >
                <HotColumn title='Price/Unit Price' />
                <HotColumn title='Consumption' />
              </HotTable>

              <label style={{ width: '100%', margin: '15px auto' }} htmlFor='framework-field'>
                Modeling Option:
              </label>

              <Select
                name={'framework-field'}
                inputId={'framework-field'}
                options={ModelOptions}
                onChange={option => {
                  if (option) {
                    setModelOption(option);
                    setChartOptions({});

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
                  menu: base => ({
                    ...base,
                    width: 'max-content',
                    minWidth: '100%',
                  }),
                }}
              />

              {modelOption !== ModelOptions[3] && (
                <>
                  <label style={{ width: '100%', margin: '15px auto' }} htmlFor='span-field'>
                    Scaling parameter (K) Value:
                  </label>
                  <Select
                    name={'span-field'}
                    inputId={'span-field'}
                    options={kOptionsAvailable}
                    onChange={option => {
                      if (option) {
                        setKOption(option);
                      }
                    }}
                    value={kOption}
                    styles={{
                      menu: base => ({
                        ...base,
                        width: 'max-content',
                        minWidth: '100%',
                      }),
                    }}
                    menuPlacement='auto'
                    menuPosition='fixed'
                  />
                </>
              )}

              <br />

              <MDBBtn
                noRipple
                style={{
                  width: '100%',
                  margin: '15px auto',
                }}
                tag='a'
                href='#!'
                disabled={runningCalculation}
                className='button-fit-card'
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
        <MDBCol md='4'>
          <MDBCard className='outputPanel'>
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
