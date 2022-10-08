/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState, useReducer } from 'react';
import CarouselConference from '../../components/CarouselConference';
import Select from 'react-select';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import {
  AuthorOptions,
  InitialSubmissionState,
  SubmissionAction,
  SubmissionReducer,
} from './functionality/SubmissionFunctionality';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { useFirestore } from '../../firebase/hooks/useFirestore';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument';
import { timestamp } from '../../firebase/config';
import { ShowSubmissionsClosed } from './views/ShowSubmissionsClosed';
import { IndividualUserRecord, PosterSubmission } from '../../firebase/types/RecordTypes';
import { CommonHeading } from './views/CommonHeading';
import { checkIfSubmissionsOpen } from './helpers/SubmissionDateHelper';
import { handleCreateStudentSubmit } from './helpers/SubmissionSender';

export default function Submission(params: { userId: string }): JSX.Element {
  const { user, authIsReady } = useAuthorizationContext();
  const { addDocument, response } = useFirestore('submissions');
  const { document } = useFirebaseDocumentTyped<IndividualUserRecord>({
    collectionString: 'users',
    idString: params.userId,
  });
  const [state, dispatch] = useReducer(SubmissionReducer, InitialSubmissionState);
  const [buttonText, setButtonText] = useState<string>('Submit Poster Application');

  useEffect(() => {
    if (authIsReady && user && document) {
      const userDoc = document;

      dispatch({
        type: SubmissionAction.Author,
        payload: `${userDoc.userName} (${userDoc.userInstitution})`,
      });
      dispatch({ type: SubmissionAction.Email, payload: userDoc.userEmail });
    } else {
      return;
    }
  }, [authIsReady, user, document]);

  if (checkIfSubmissionsOpen() === false) {
    return <ShowSubmissionsClosed />;
  }

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <CommonHeading />
              <MDBCardText style={CardBodyTextStyle}>
                Students may choose to be considered for inclusion as a{' '}
                <b>SQAB 2023 Tony Nevin Student Presenter</b>. If interested, you will need to (1)
                confirm this in your submission and (2) upload your CV and a letter of
                recommendation using a link that will be included in a follow-up email.
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
          <CarouselConference />
        </MDBCol>
        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Poster Submission Portal</MDBCardTitle>
              <div
                style={{
                  maxWidth: '600px',
                }}
              >
                <form>
                  <label>
                    <span>Submitting Author (Edit in Profile):</span>
                    <input required disabled type="text" value={state.submittingAuthor}></input>
                  </label>
                  <label>
                    <span>Corresponding Email (Edit in Profile):</span>
                    <input required disabled type="email" value={state.correspondingEmail}></input>
                  </label>
                  <label>
                    <span>Poster Title:</span>
                    <textarea
                      required
                      onChange={(e) =>
                        dispatch({ type: SubmissionAction.Title, payload: e.target.value })
                      }
                      placeholder={'Experimental comparison of...'}
                      value={state.posterTitle}
                    ></textarea>
                  </label>
                  <label>
                    <span>Poster Abstract (Maximum 120 Words):</span>
                    <textarea
                      required
                      onChange={(e) =>
                        dispatch({ type: SubmissionAction.Abstract, payload: e.target.value })
                      }
                      placeholder={'In this study...'}
                      value={state.posterAbstract}
                    ></textarea>
                  </label>
                  <label>
                    <span>Full Author List (One per line, please):</span>
                    <textarea
                      onChange={(e) =>
                        dispatch({
                          type: SubmissionAction.AuthorsFull,
                          payload: e.target.value,
                        })
                      }
                      placeholder={'Firstname Lastname (XYZ University)'}
                      value={state.posterAuthorsFull}
                    ></textarea>
                  </label>
                  <label htmlFor="framework-field">Tony Nevin Student Presenter Award:</label>
                  <Select
                    name={'framework-field'}
                    inputId={'framework-field'}
                    options={AuthorOptions}
                    value={state.authorChoice}
                    onChange={(option: any) =>
                      dispatch({ type: SubmissionAction.Choice, payload: option })
                    }
                  />

                  <MDBBtn
                    noRipple
                    disabled={buttonText !== 'Submit Poster Application'}
                    style={{
                      width: '100%',
                      marginTop: '25px',
                    }}
                    onClick={async (e) => {
                      await handleCreateStudentSubmit({
                        state,
                        user,
                        addDocument,
                        setButtonText,
                        response,
                        dispatch,
                      });
                    }}
                  >
                    {buttonText}
                  </MDBBtn>

                  {state.formError && <p className="error">{state.formError}</p>}
                </form>
                <br></br>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
