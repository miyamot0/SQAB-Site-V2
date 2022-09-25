/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * User Recruitment Page
 */

import React, { useEffect, useReducer } from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument';
import { RoutedAdminSet } from './types/ProfileTypes';
import { useFirestore } from '../../firebase/hooks/useFirestore';
import {
  InitialRecruitmentState,
  RecruitmentEditAction,
  RecruitmentEditReducer,
} from './functionality/UserFunctionality';
import { EditRecruitmentState } from '../recruitment/types/RecruitmentTypes';
import { dateToMDY, dateToYMD } from './helpers/RecruitmentHelpers';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { IndividualUserRecord, RecruitmentAd } from '../../firebase/types/RecordTypes';

export default function UserRecruitment() {
  const { id } = useParams<RoutedAdminSet>();
  const { documentError: docRecErr, document: docRec } = useFirebaseDocumentTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    idString: id,
  });
  const { documentError: docUsrErr, document: docUsr } =
    useFirebaseDocumentTyped<IndividualUserRecord>({
      collectionString: 'users',
      idString: id,
    });

  const { updateDocument, response } = useFirestore('recruitment');
  const { authIsReady } = useAuthorizationContext();

  const [state, dispatch] = useReducer(RecruitmentEditReducer, InitialRecruitmentState);
  const [didBuild, setDidBuild] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const history = useHistory();

  useEffect(() => {
    if (docRec && docUsr && !didBuild) {
      setDidBuild(true);

      const modDateRec = {
        ...docRec,
        Cycle: dateToYMD(docRec.Cycle),
      } as unknown as EditRecruitmentState;

      dispatch({ type: RecruitmentEditAction.LoadUser, payload: docUsr });
      dispatch({ type: RecruitmentEditAction.LoadRecruitment, payload: modDateRec });
    }
  }, [docRec, docUsr, didBuild]);

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   */
  async function handleEditRecruitmentSubmit(): Promise<void> {
    setFormError('');

    const selectedProperties = {
      Bio: state.Bio,
      Contact: state.userEmail,
      Cycle: state.Cycle,
      Description: state.Description,
      Institution: state.userInstitution,
      LabLink: state.LabLink,
      Link: state.Link,
      Mentor: state.userName,
      Name: state.userName,
      Position: state.Position,
    };

    selectedProperties.Cycle = dateToMDY(selectedProperties.Cycle);

    await updateDocument(id, selectedProperties);

    if (response.error) {
      alert(response.error);
    } else {
      history.push('/');
    }

    return;
  }

  if (!authIsReady) {
    return <></>;
  }

  if (docRecErr || docUsrErr) {
    return (
      <div>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Recruitment Details</MDBCardTitle>
                At present, you currently do not have a recruitment advertisement. Please contact
                the site administrator.
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }

  return (
    <div>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Details</MDBCardTitle>
              <form>
                <label>
                  <span>Name (Edit in Profile):</span>
                  <input required type="text" disabled value={state.userName}></input>
                </label>
                <label>
                  <span>Email (Edit in Profile):</span>
                  <input required type="text" disabled value={state.userEmail}></input>
                </label>
                <label>
                  <span>Institution (Edit in Profile):</span>
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
                  onClick={() => handleEditRecruitmentSubmit()}
                >
                  Edit Profile
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
