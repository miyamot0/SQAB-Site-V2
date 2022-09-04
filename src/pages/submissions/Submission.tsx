/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useReducer } from 'react';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { useFirestore } from '../../firebase/useFirestore';

import CarouselConference from '../../components/CarouselConference';
import { PosterSubmission } from './types/SubmissionTypes';
import {
  AuthorOptions,
  InitialSubmissionState,
  SubmissionAction,
  SubmissionReducer,
} from './functionality/SubmissionFunctionality';
import { useAuthorizationContext } from '../../context/useAuthorizationContext';

const ShowSubmissionPortal: boolean | null = true;

export default function Submission(): JSX.Element {
  const { user } = useAuthorizationContext();
  const { addDocument, response } = useFirestore('submissions');
  const [state, dispatch] = useReducer(SubmissionReducer, InitialSubmissionState);

  /** handleCreateStudentSubmit
   *
   * @param {HTMLFormElement} e
   */
  async function handleCreateStudentSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (state.submittingAuthor!.split(/\w\w+/).length - 1 < 2) {
      dispatch({
        type: SubmissionAction.Author,
        payload: 'Please enter a full name (i.e., First and Last)!',
      });
      return;
    } else if (state.posterTitle!.split(/\w\w+/).length - 1 < 2) {
      dispatch({
        type: SubmissionAction.Author,
        payload: 'Please enter a full title (i.e., 3+ Words)!',
      });
      return;
    } else if (state.posterAbstract!.split(/\w\w+/).length - 1 > 120) {
      dispatch({
        type: SubmissionAction.Author,
        payload: 'Abstract is too long (i.e., over 120 words)!',
      });
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
      alert('Your submission has been received and is currently under consideration.');
    }
  }

  if (user) {
    return (
      <>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="8">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Submissions for Annual Conference</MDBCardTitle>
                <MDBCardText style={CardBodyTextStyle}>
                  Submissions for the 2023 annual conference (i.e., posters) can be submitted
                  through our online form. The information necessary to submit is provided below.
                </MDBCardText>
                <MDBCardText style={CardBodyTextStyle}>
                  Students may choose to be considered for inclusion as a{' '}
                  <b>SQAB 2023 Tony Nevin Student Presenter</b>. If interested, you will need to (1)
                  confirm this in your submission and (2) upload your CV and a letter of
                  recommendation using a link that will be included in a follow-up email.
                </MDBCardText>
                <MDBCardText style={CardBodyTextStyle}>
                  Once all areas are completed, please press the Submit button once to finalize the
                  submission.
                </MDBCardText>
                {ShowSubmissionPortal && (
                  <MDBCardText style={CardBodyTextStyle}>
                    Time Remaining: (Not Yet Open)
                  </MDBCardText>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/**
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
                {ShowSubmissionPortal === null ? (
                  <p>Submissions are currently closed.</p>
                ) : (
                  <div
                    style={{
                      maxWidth: '600px',
                    }}
                  >
                    <form onSubmit={handleCreateStudentSubmit}>
                      <label>
                        <span>Submitting Author:</span>
                        <input
                          required
                          type="text"
                          onChange={(e) =>
                            dispatch({ type: SubmissionAction.Author, payload: e.target.value })
                          }
                          placeholder={'Firstname Lastname'}
                          value={state.submittingAuthor}
                        ></input>
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
                        <span>Corresponding Email:</span>
                        <input
                          required
                          type="email"
                          onChange={(e) =>
                            dispatch({ type: SubmissionAction.Email, payload: e.target.value })
                          }
                          placeholder={'presenter@company.com'}
                          value={state.correspondingEmail}
                        ></input>
                      </label>
                      <label>
                        <span>Abstract (Maximum 120 Words):</span>
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
                        style={{
                          width: '100%',
                          marginTop: '25px',
                        }}
                      >
                        Submit Application
                      </MDBBtn>

                      {state.formError && <p className="error">{state.formError}</p>}
                    </form>
                    <br></br>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
   */}
      </>
    );
  } else {
    return (
      <>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="8">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Submissions for Annual Conference</MDBCardTitle>
                <MDBCardText style={CardBodyTextStyle}>
                  Submissions for the 2023 annual conference (i.e., posters) can be submitted
                  through our online form. The information necessary to submit is provided below.
                </MDBCardText>
                <MDBCardText style={CardBodyTextStyle}>
                  Students may choose to be considered for inclusion as a{' '}
                  <b>SQAB 2023 Tony Nevin Student Presenter</b>. If interested, you will need to (1)
                  confirm this in your submission and (2) upload your CV and a letter of
                  recommendation using a link that will be included in a follow-up email.
                </MDBCardText>
                <MDBCardText style={CardBodyTextStyle}>
                  Once all areas are completed, please press the Submit button once to finalize the
                  submission.
                </MDBCardText>
                {ShowSubmissionPortal && (
                  <MDBCardText style={CardBodyTextStyle}>Time Remaining: ...</MDBCardText>
                )}
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
                {ShowSubmissionPortal === null ? (
                  <p>Submissions are currently closed.</p>
                ) : (
                  <div
                    style={{
                      maxWidth: '600px',
                    }}
                  >
                    <form onSubmit={handleCreateStudentSubmit}>
                      <label>
                        <span>Submitting Author:</span>
                        <input
                          required
                          type="text"
                          onChange={(e) =>
                            dispatch({ type: SubmissionAction.Author, payload: e.target.value })
                          }
                          placeholder={'Firstname Lastname'}
                          value={state.submittingAuthor}
                        ></input>
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
                        <span>Corresponding Email:</span>
                        <input
                          required
                          type="email"
                          onChange={(e) =>
                            dispatch({ type: SubmissionAction.Email, payload: e.target.value })
                          }
                          placeholder={'presenter@company.com'}
                          value={state.correspondingEmail}
                        ></input>
                      </label>
                      <label>
                        <span>Abstract (Maximum 120 Words):</span>
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
                        style={{
                          width: '100%',
                          marginTop: '25px',
                        }}
                      >
                        Submit Application
                      </MDBBtn>

                      {state.formError && <p className="error">{state.formError}</p>}
                    </form>
                    <br></br>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}
