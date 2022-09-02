/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { useFirestore } from '../../firebase/useFirestore';

import CarouselConference from '../../components/CarouselConference';
import { SingleOptionType } from '../tools/helpers/GeneralTypes';
import { PosterSubmission } from './types/SubmissionTypes';

const AuthorOptions: SingleOptionType[] = [{
  label: "I am interested.",
  value: "I am interested.",
},
{
  label: "I am NOT interested.",
  value: "I am NOT interested.",
}]

export default function Submission(): JSX.Element {
  const { addDocument, response } = useFirestore('submissionsTemp');

  const [setInformation, setShowInformation] = useState<boolean | null>(null);

  const [formError, setFormError] = useState<string>();
  const [submittingAuthor, setSubmittingAuthor] = useState<string>("");
  const [posterTitle, setPosterTitle] = useState<string>("");
  const [posterAbstract, setPosterAbstract] = useState<string>("");
  const [posterAuthorsFull, setPosterAuthorsFull] = useState<string>("");
  const [correspondingEmail, setCorrespondingEmail] = useState<string>("");
  const [authorChoice, setAuthorChoice] = useState<SingleOptionType>({
    label: "I am interested.",
    value: "I am interested.",
  });

  /** handleCreateStudentSubmit
   * 
   * @param {HTMLFormElement} e 
   */
  async function handleCreateStudentSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (submittingAuthor!.split(/\w\w+/).length - 1 < 2) {
      console.log("1")
      setFormError("Please enter a full name (i.e., First and Last)!")
      return;
    } else if (posterTitle!.split(/\w\w+/).length - 1 < 2) {
      console.log("1")
      setFormError("Please enter a full title (i.e., 3+ Words)!");
      return;
    } else if (posterAbstract!.split(/\w\w+/).length - 1 > 120) {
      console.log("1")
      setFormError("Abstract is too long (i.e., over 120 words)!");
      return;
    }

    const posterSubmission: PosterSubmission = {
      name: submittingAuthor,
      title: posterTitle,
      email: correspondingEmail,
      abstract: posterAbstract,
      list: posterAuthorsFull,
      time: timestamp.fromDate(new Date()),
      presenter: authorChoice.value === "I am interested.",
    };

    await addDocument(posterSubmission);

    if (response.error) {
      alert(`There was an issue uploading your submission: ${response.error}`);
    } else {
      alert('Your submission has been received and is currently under consideration.');
    }
  }

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle><span onClick={() => setShowInformation(true)}>Submissions for Annual Conference</span></MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Submissions for the 2023 annual conference (i.e., posters) can be submitted through
                our online form. The information necessary to submit is provided below.
              </MDBCardText>
              <MDBCardText style={CardBodyTextStyle}>
                Students may choose to be considered for inclusion as a {" "}
                <b>SQAB 2023 Tony Nevin Student Presenter</b>. If interested, you will need to (1)
                confirm this in your submission and (2) upload your CV and a letter of
                recommendation using a link that will be included in a follow-up email.
              </MDBCardText>
              <MDBCardText style={CardBodyTextStyle}>
                Once all areas are completed, please press the Submit button once to finalize the
                submission.
              </MDBCardText>
              {setInformation && (<MDBCardText style={CardBodyTextStyle}>(TESTING) Time Remaining: ...</MDBCardText>)}
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
              {setInformation === null ? (<p>Submissions are currently closed.</p>) : (<div style={{
                maxWidth: '600px',
              }}>
                <form onSubmit={handleCreateStudentSubmit}>
                  <label>
                    <span>Submitting Author:</span>
                    <input
                      required
                      type="text"
                      onChange={(e) => setSubmittingAuthor(e.target.value)}
                      placeholder={"Firstname Lastname"}
                      value={submittingAuthor}
                    ></input>
                  </label>
                  <label>
                    <span>Poster Title:</span>
                    <textarea
                      required
                      onChange={(e) => setPosterTitle(e.target.value)}
                      placeholder={"Experimental comparison of..."}
                      value={posterTitle}
                    ></textarea>
                  </label>
                  <label>
                    <span>Corresponding Email:</span>
                    <input
                      required
                      type="email"
                      onChange={(e) => setCorrespondingEmail(e.target.value)}
                      placeholder={"presenter@company.com"}
                      value={correspondingEmail}
                    ></input>
                  </label>
                  <label>
                    <span>Abstract (Maximum 120 Words):</span>
                    <textarea
                      required
                      onChange={(e) => setPosterAbstract(e.target.value)}
                      placeholder={"In this study..."}
                      value={posterAbstract}
                    ></textarea>
                  </label>
                  <label>
                    <span>Full Author List (One per line, please):</span>
                    <textarea
                      onChange={(e) => setPosterAuthorsFull(e.target.value)}
                      placeholder={"Firstname Lastname (XYZ University)"}
                      value={posterAuthorsFull}
                    ></textarea>
                  </label>
                  <label>
                    <span>Tony Nevin Student Presenter Award:</span>
                    <Select options={AuthorOptions}
                      value={authorChoice}
                      onChange={(option: any) => setAuthorChoice(option)} />
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

                  {formError && <p className="error">{formError}</p>}
                </form>
                <br></br>
              </div>)}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
