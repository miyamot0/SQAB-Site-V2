/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBBtn, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit';
import { IndividualUserRecord } from '../../../firebase/types/RecordTypes';
import { UserEditAction } from '../functionality/UserProfileFunctionality';
import { OutputUserError } from './UserOutputError';
import {
  remapStringArray,
  StandardEmailFieldText,
  StandardEntryFieldText,
  StandardSelectField,
  StandardSelectFieldMulti,
} from '../../../utilities/FormEntryHelper';
import {
  AgeOptions,
  DemographicOptions,
  EducationOptions,
  GenderOptions,
  SexualityOptions,
} from '../helpers/DemographicOptions';

/** UserOutputBody
 *
 * @param param0
 * @returns
 */
export function UserOutputBody({
  state,
  submitCallback,
  dispatch,
}: {
  state: IndividualUserRecord;
  submitCallback: any;
  dispatch: any;
}): JSX.Element {
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
    <>
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

        <StandardEmailFieldText
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

        <StandardSelectField
          label={'What is the highest degree or level of education you have completed?'}
          options={remapStringArray(EducationOptions)}
          currentValue={state.userEducation}
          type={UserEditAction.EditEducation}
          dispatch={dispatch}
        />

        <StandardSelectField
          label={'What is your current gender identity?'}
          options={remapStringArray(GenderOptions)}
          currentValue={state.userGender}
          type={UserEditAction.EditGender}
          dispatch={dispatch}
        />

        <StandardSelectField
          label={'What is your age?'}
          options={remapStringArray(AgeOptions)}
          currentValue={state.userAge}
          type={UserEditAction.EditAge}
          dispatch={dispatch}
        />

        <StandardSelectFieldMulti
          label={'What is your race or ethnicity? Select all that apply.'}
          options={remapStringArray(DemographicOptions)}
          currentValue={state.userRaceEthnicity}
          type={UserEditAction.EditRaceEthnicity}
          dispatch={dispatch}
        />

        <StandardSelectField
          label={'Do you consider yourself to be:'}
          options={remapStringArray(SexualityOptions)}
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
    </>
  );
}
