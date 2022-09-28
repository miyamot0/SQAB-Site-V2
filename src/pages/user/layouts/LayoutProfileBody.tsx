/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { UserEditAction } from '../functionality/UserProfileFunctionality';
import { OutputUserError } from '../views/UserOutputError';

import {
  AgeOptions,
  DemographicOptions,
  EducationOptions,
  GenderOptions,
  SexualityOptions,
} from '../helpers/DemographicOptions';
import { LayoutProfileBodyInterface } from '../interfaces/UserInterfaces';
import { StandardEntryFieldText, StandardEntryFieldEmail, StandardEntryFieldSelectSingle, StandardEntryFieldSelectMultiple } from 'smallnstats-shared-component-library';

/** UserOutputBody
 *
 * @param param0
 * @returns
 */
export function LayoutProfileBody({ state, submitCallback, dispatch,
}: LayoutProfileBodyInterface): JSX.Element {
  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   */
  async function handleEditFormSubmit(): Promise<void> {
    dispatch({ type: UserEditAction.EditFormError, payload: '' });

    submitCallback();
  }

  return (
    <div>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Edit Profile Information</MDBCardTitle>
              <MDBCardText>
                Please complete your profile. In the near future, both recruitment and poster submissions
                will link directly to your profile. At a minimum, please ensure that your name and
                institution are indicated and spelled correctly.
              </MDBCardText>
              <form>
                <StandardEntryFieldText
                  label={'User Name (For Ad/Poster):'}
                  currentValue={state.userName}
                  type={UserEditAction.Name}
                  dispatch={dispatch}
                />

                <StandardEntryFieldEmail
                  label={'User Email (For Ad/Poster):'}
                  currentValue={state.userEmail}
                  type={UserEditAction.Email}
                  dispatch={dispatch}
                />

                <StandardEntryFieldText
                  label={'User Institution (For Ad/Poster):'}
                  currentValue={state.userInstitution}
                  type={UserEditAction.Institution}
                  dispatch={dispatch}
                />

                {state.phoneAuthed && (
                  <label>
                    <span>Phone on Record (Only for Phone Login):</span>
                    <input type="text" disabled value={state.userPhone}></input>
                  </label>
                )}

                <StandardEntryFieldSelectSingle
                  label={'What is the highest degree or level of education you have completed?'}
                  options={EducationOptions}
                  currentValue={state.userEducation}
                  type={UserEditAction.EditEducation}
                  dispatch={dispatch}
                />

                <StandardEntryFieldSelectSingle
                  label={'What is your current gender identity?'}
                  options={GenderOptions}
                  currentValue={state.userGender}
                  type={UserEditAction.EditGender}
                  dispatch={dispatch}
                />

                <StandardEntryFieldSelectSingle
                  label={'What is your age?'}
                  options={AgeOptions}
                  currentValue={state.userAge}
                  type={UserEditAction.EditAge}
                  dispatch={dispatch}
                />

                <StandardEntryFieldSelectMultiple
                  label={'What is your race or ethnicity? Select all that apply.'}
                  options={DemographicOptions}
                  currentValue={state.userRaceEthnicity}
                  type={UserEditAction.EditRaceEthnicity}
                  dispatch={dispatch}
                />

                <StandardEntryFieldSelectSingle
                  label={'Do you consider yourself to be:'}
                  options={SexualityOptions}
                  currentValue={state.userOrientation}
                  type={UserEditAction.EditOrientation}
                  dispatch={dispatch}
                />

                <br />

                <MDBBtn
                  noRipple
                  style={{
                    width: '100%',
                    marginBottom: '25px',
                  }}
                  tag="a"
                  href="#!"
                  className="button-fit-card"
                  onClick={() => handleEditFormSubmit()}
                >
                  Save Profile Information
                </MDBBtn>

                <OutputUserError documentError={state.formError} />
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <br></br>
    </div>
  );
}
