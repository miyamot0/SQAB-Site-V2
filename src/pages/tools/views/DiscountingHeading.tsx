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

export function DiscountingHeading() {
  return (
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
              spreadsheet software. At present, the online version of the DMS is performed with only
              one discounting series at a time.
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
              Gilroy, S. P. &#38; Hantula, D. A. (2018). Discounting model selection with area-based
              measures: A case for numerical integration.{' '}
              <i>Journal of the Experimental Analysis of Behavior, 109(2)</i>, 433-449.{' '}
              <a href="https://doi.org/10.1002/jeab.318">doi: 10.1002/jeab.318</a>.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
