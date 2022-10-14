/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export function DemandHeading() {
  return (
    <MDBRow center className='row-eq-height'>
      <MDBCol sm='8'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Demand Curve Analyzer</MDBCardTitle>
            <MDBCardText style={CardBodyTextStyle} className='toolsDescription'>
              The Demand Curve Analyzer is designed to assist clinicians and researchers in
              conducting behavior economic analyses while also providing more accessible options for
              these calculations. Demand Curve Analyzer fits respective parameters using
              differential evolution, a robust metaheuristic process for optimizing model
              performance. At present, only a single series may be fitted at a time. All methods are
              performed &quot;behind the scenes&quot;, faciliating model fitting while retaining a
              simple, spreadsheet-based interface. This project is fully open-sourced under a
              GPL-license (v3) and all source code is completely available.
              <br />
              <br />
              <b>Based on the following works:</b>
              <br />
              Hursh, S. R., & Silberberg, A. (2008). Economic demand and essential value.
              <i>Psychological Review, 115(1)</i>, 186-198. doi:{' '}
              <a href='https://psycnet.apa.org/doi/10.1037/0033-295X.115.1.186'>
                10.1037/0033-295X.115.1.186
              </a>
              <br />
              <br />
              Koffarnus, M. N., Franck, C. T., Stein, J. S., & Bickel, W. K. (2015). A modified
              exponential behavioral economic demand model to better describe consumption data.
              <i>Experimental and clinical psychopharmacology, 23(6)</i>, 504-512. doi:{' '}
              <a href='https://doi.org/10.1037%2Fpha0000045'>10.1037/pha0000045</a>
              <br />
              <br />
              Gilroy, S. P., Kaplan, B. A., Reed, D. D., Koffarnus, M. N. & Hantula, D. A. (2018).
              The Demand Curve Analyzer: Behavioral economic software for applied researchers.
              <i>Journal of the Experimental Analysis of Behavior, 110(3)</i>, 553-568. doi:{' '}
              <a href='https://doi.org/10.1002/jeab.479'>10.1002/jeab.479</a>.
              <br />
              <br />
              Kaplan, B. A., Gilroy, S. P., Reed, D. D., Koffarnus, M. N., & Hursh, S. R. (2019).
              The R package beezdemand: behavioral economic easy demand.{' '}
              <i>Perspectives on Behavior Science, 42(1)</i>, 163-180.{' '}
              <a href='https://doi.org/10.1007/s40614-018-00187-7'>10.1007/s40614-018-00187-7</a>.
              <br />
              <br />
              Gilroy, S.P., Kaplan, B.A., Reed, D.D., Hantula, D.A., &#38; Hursh, S. R. (2019). An
              Exact Solution for Unit Elasticity in the Exponential Model of Demand.{' '}
              <i>Journal of Experimental and Clinical Psychopharmacology, 27(6)</i>, 588-597. doi:{' '}
              <a href='https://psycnet.apa.org/doi/10.1037/pha0000268'>10.1037/pha0000268</a>.
              <br />
              <br />
              Gilroy, S. P., Kaplan, B. A., Schwartz, L. P., Reed, D. D., & Hursh, S. R. (2021). A
              zero-bounded model of operant demand.{' '}
              <i>Journal of the Experimental Analysis of Behavior, 115(3)</i>, 729-746. doi:{' '}
              <a href='https://doi.org/10.1002/jeab.679'>10.1002/jeab.679</a>.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
