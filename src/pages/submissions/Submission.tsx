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

export default function Submission(params: { userId: string }): JSX.Element {
  const { user, authIsReady } = useAuthorizationContext();
  const { addDocument, response } = useFirestore('submissions');
  const { document } = useFirebaseDocumentTyped<IndividualUserRecord>({
    collectionString: 'users',
    idString: params.userId,
  });
  const [state, dispatch] = useReducer(SubmissionReducer, InitialSubmissionState);
  const [showSubmissionPortal] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Submit Poster Application');

  useEffect(() => {
    if (authIsReady && user && document) {
      const userDoc = document;

      dispatch({
        type: SubmissionAction.Author,
        payload: `${userDoc.userName} (${userDoc.userInstitution})`,
      });
      dispatch({ type: SubmissionAction.Email, payload: userDoc.userEmail });
    }
  }, [authIsReady, user, document]);

  /** handleCreateStudentSubmit
   *
   * @param {HTMLFormElement} e
   */
  async function handleCreateStudentSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (state.submittingAuthor && state.posterTitle && state.posterAbstract) {
      if (state.submittingAuthor.split(/\w\w+/).length - 1 < 2) {
        alert('Please enter a full name (i.e., First and Last)!');
        return;
      } else if (state.posterTitle.split(/\w\w+/).length - 1 < 2) {
        alert('Please enter a full title (i.e., 3+ Words)!');
      } else if (state.posterAbstract.split(/\w\w+/).length - 1 > 120) {
        alert('Abstract is too long (i.e., over 120 words)!');
        return;
      }

      const posterSubmission: PosterSubmission = {
        name: state.submittingAuthor,
        title: state.posterTitle,
        email: state.correspondingEmail,
        abstract: state.posterAbstract,
        list: state.posterAuthorsFull,
        time: timestamp.fromDate(new Date()),
        presenter: state.authorChoice.value === 'I am interested.',
        reviewed: false,
      };

      await addDocument(posterSubmission, user?.uid);

      if (response.error) {
        alert(`There was an issue uploading your submission: ${response.error}`);
      } else {
        setButtonText('Submission Completed');
        alert('Your submission has been received and is currently under consideration.');
      }
    }
  }

  if (showSubmissionPortal === false) {
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
                <form onSubmit={handleCreateStudentSubmit}>
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
                  <label>
                    <span>Tony Nevin Student Presenter Award:</span>
                    <Select
                      options={AuthorOptions}
                      value={state.authorChoice}
                      onChange={(option: any) =>
                        dispatch({ type: SubmissionAction.Choice, payload: option })
                      }
                    />
                  </label>

                  <MDBBtn
                    noRipple
                    disabled={buttonText !== 'Submit Poster Application'}
                    style={{
                      width: '100%',
                      marginTop: '25px',
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
