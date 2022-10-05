/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export function CommonHeading(): JSX.Element {
  return (
    <>
      <MDBCardTitle>Submissions for Annual Conference</MDBCardTitle>
      <MDBCardText style={CardBodyTextStyle}>
        Poster submissions for the 2023 Annual Conference need to be submitted through the online
        system. You will need to authenticate via either a Google or Facebook account or by
        receiving a one-time password via text message (Note: messaging rates may apply). Once
        submitted, you may review the status of your submission at any time by authenticating (via
        the same method, of course) by selecting the &quot;Manage Poster Submission&quot; element in
        the dropdown in the upper right of your screen.
      </MDBCardText>
    </>
  );
}
