/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { timestamp } from '../../firebase/config';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { useFirestore } from '../../firebase/useFirestore';

import CarouselConference from '../../components/CarouselConference';

const CreateFormStyle = {
  maxWidth: '600px',
};

export default function Submission(): JSX.Element {
  const { addDocument, response } = useFirestore('submissions');
  const [formError, setFormError] = useState<string>();

  //TODO: add in submission functionality

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>TESTING: Submissions for Annual Conference</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Submissions for the 2022 annual conference (i.e., posters) can be submitted through
                our online form. The information necessary to submit is provided below.
              </MDBCardText>
              <MDBCardText style={CardBodyTextStyle}>
                Students may choose to be considered for inclusion as a
                <b>SQAB 2022 Tony Nevin Student Presenter</b>. If interested, you will need to (1)
                confirm this in your submission and (2) upload your CV and a letter of
                recommendation using a link that will be included in your submission confirmation
                email.
              </MDBCardText>
              <MDBCardText style={CardBodyTextStyle}>
                Once all areas are completed, please press the Submit button once to finalize the
                submission.
              </MDBCardText>
              <MDBCardText style={CardBodyTextStyle}>(TESTING) Time Remaining: ...</MDBCardText>
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
              <MDBCardTitle>Submission Portal</MDBCardTitle>
              <div style={CreateFormStyle}>
                <h2 className="global-page-title">Add a new student</h2>

                <form onSubmit={handleCreateStudentSubmit}>
                  <label>
                    <span>Student ID:</span>
                    <input
                      required
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    ></input>
                  </label>
                  <label>
                    <span>Student Details:</span>
                    <textarea
                      required
                      onChange={(e) => setDetails(e.target.value)}
                      value={details}
                    ></textarea>
                  </label>
                  <label>
                    <span>Next Benchmark Date:</span>
                    <input
                      required
                      type="date"
                      onChange={(e) => setDueDate(e.target.value)}
                      value={dueDate}
                    ></input>
                  </label>
                  <label>
                    <span>Current Grade</span>
                    <Select options={Grades} onChange={(option) => setCurrentGrade(option!)} />
                  </label>
                  <label>
                    <span>Target For Benchmarking</span>
                    <Select
                      options={CoreOperations}
                      onChange={(option: MultiValue<SingleOptionType>) =>
                        setCurrentBenchmarking(option)
                      }
                      value={currentBenchmarking}
                      isMulti={true}
                    />
                  </label>
                  <label>
                    <span>Target For Intervention</span>
                    <Select
                      options={Operations}
                      onChange={(option) => setCurrentTarget(option!)}
                      value={currentTarget}
                    />
                  </label>
                  <label>
                    <span>Intervention Approach</span>
                    <Select
                      options={InterventionApproach}
                      onChange={(option) => setCurrentApproach(option!)}
                      value={currentApproach}
                    />
                  </label>
                  <label>
                    <span>Error Correction Procedures</span>
                    <Select
                      options={ErrorCorrection}
                      onChange={(option) => setCurrentErrorApproach(option!)}
                      value={currentErrorApproach}
                    />
                  </label>
                  <label>
                    <span>Reinforcement Procedures</span>
                    <Select
                      options={Contingencies}
                      onChange={(option) => setCurrentSRApproach(option!)}
                      value={currentSRApproach}
                    />
                  </label>

                  <button className="global-btn global-btn-light-red">Submit Application</button>
                  {formError && <p className="error">{formError}</p>}
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
