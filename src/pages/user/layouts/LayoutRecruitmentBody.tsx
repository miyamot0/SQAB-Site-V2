/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';
import { RecruitmentEditAction } from '../functionality/UserRecruitmentFunctionality';
import { handleEditRecruitmentSubmit } from '../helpers/RecruitmentHelpers';
import { EditRecruitmentState } from '../../recruitment/types/RecruitmentTypes';

export interface LayoutRecruitmentBody {
  state: EditRecruitmentState;
  id: string | undefined;
  updateDocument: any;
  history: any;
  response: FirestoreState;
  dispatch: any;
}

export function LayoutRecruitmentBody({
  state,
  id,
  updateDocument,
  history,
  response,
  dispatch,
}: LayoutRecruitmentBody) {
  const [formError, setFormError] = useState<string>('');

  return (
    <div>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Details</MDBCardTitle>
              <form>
                <label>
                  <span>Name:</span>
                  <input required type="text" disabled value={state.userName}></input>
                </label>
                <label>
                  <span>Email:</span>
                  <input required type="text" disabled value={state.userEmail}></input>
                </label>
                <label>
                  <span>Institution:</span>
                  <input required type="text" disabled value={state.userInstitution}></input>
                </label>
                <label>
                  <span>Position Title:</span>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      dispatch({
                        type: RecruitmentEditAction.EditPosition,
                        payload: e.target.value,
                      })
                    }
                    value={state.Position}
                  ></input>
                </label>

                <label>
                  <span>Mentor Biography:</span>
                  <textarea
                    onChange={(e) =>
                      dispatch({
                        type: RecruitmentEditAction.EditMentorBio,
                        payload: e.target.value,
                      })
                    }
                    value={state.Bio}
                  ></textarea>
                </label>

                <label>
                  <span>Position Description:</span>
                  <textarea
                    onChange={(e) =>
                      dispatch({
                        type: RecruitmentEditAction.EditDescription,
                        payload: e.target.value,
                      })
                    }
                    value={state.Description}
                  ></textarea>
                </label>
                <label>
                  <span>Application Deadline:</span>
                  <input
                    required
                    type="date"
                    onChange={(e) =>
                      dispatch({ type: RecruitmentEditAction.EditDate, payload: e.target.value })
                    }
                    value={state.Cycle}
                  ></input>
                </label>
                <label>
                  <span>Link to Lab Webpage:</span>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: RecruitmentEditAction.EditLabLink, payload: e.target.value })
                    }
                    value={state.LabLink}
                  ></input>
                </label>
                <label>
                  <span>Link to Application:</span>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: RecruitmentEditAction.EditLink, payload: e.target.value })
                    }
                    value={state.Link}
                  ></input>
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
                  onClick={async () => {
                    if (
                      state.userName.length === 0 ||
                      state.Bio.length === 0 ||
                      state.Description.length === 0 ||
                      state.Cycle.length === 0 ||
                      state.LabLink.length === 0 ||
                      state.Link.length === 0
                    ) {
                      setFormError('One of the fields is blank');
                    } else {
                      setFormError('');

                      await handleEditRecruitmentSubmit(
                        state,
                        id,
                        updateDocument,
                        history,
                        response,
                      );
                    }
                  }}
                >
                  Save Application
                </MDBBtn>

                {formError && <p className="error">{formError}</p>}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <br></br>
    </div>
  );
}
