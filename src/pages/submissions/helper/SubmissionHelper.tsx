import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React from 'react';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export function commonHeading(): JSX.Element {
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

export function showSubmissionsClosed(): JSX.Element {
  return (
    <MDBRow center className="row-eq-height">
      <MDBCol sm="6">
        <MDBCard>
          <MDBCardBody>
            {commonHeading()}
            <MDBCardText style={CardBodyTextStyle}>
              At this point in time <b>submissions are currently closed</b>. Additional information
              will be made available nearer the conference date.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

/*
export function showSubmissionsNotLoggedIn(): JSX.Element {
  return (
    <MDBRow center className="row-eq-height">
      <MDBCol sm="6">
        <MDBCard>
          <MDBCardBody>
            {commonHeading()}
            <MDBCardText style={CardBodyTextStyle}>
              <b>You must first authenticate before you can submit your information.</b> Please
              navigate to the sign-in page using the "Log In" link in the upper right of your
              screen.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
*/
