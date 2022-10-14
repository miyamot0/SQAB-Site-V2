/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MDBCol } from 'mdb-react-ui-kit';
import React from 'react';
import { ResultsHS, ResultsZBE2, ResultsZBE3 } from './DemandResults';

export interface PmaxOutput {
  modelOption: {
    value: string;
    label: string;
  };
  ModelOptions: {
    value: string;
    label: string;
  }[];
  hotData2: string[][] | undefined;
}

export function PmaxOutput({ modelOption, ModelOptions, hotData2 }: PmaxOutput) {
  return (
    <>
      <MDBCol md='4'>
        {modelOption === ModelOptions[0] ? (
          <ResultsZBE2 hotData2={hotData2} />
        ) : modelOption === ModelOptions[1] ? (
          <ResultsZBE3 hotData2={hotData2} />
        ) : (
          <ResultsHS hotData2={hotData2} model={modelOption.value} />
        )}
      </MDBCol>
    </>
  );
}
