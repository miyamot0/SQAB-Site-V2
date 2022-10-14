/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Select from 'react-select';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';
import { createBlankAdTemplate } from '../helpers/AdministrationHelpers';
import { SingleOptionType } from '../../tools/types/GeneralTypes';

export interface AdministrationRecruitmentGeneratorInterface {
  selectedAdUser: SingleOptionType;
  userAdArray: SingleOptionType[] | null | undefined;
  setSelectedAdUser: (option: SingleOptionType) => void;
}

/** AdministrationRecruitmentGenerator
 *
 * @param param0
 * @returns
 */
export function AdministrationRecruitmentGenerator({
  selectedAdUser,
  userAdArray,
  setSelectedAdUser,
}: AdministrationRecruitmentGeneratorInterface) {
  return (
    <MDBCol sm='4'>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Create Recruitment Entry</MDBCardTitle>
          <MDBCardText style={CardBodyTextStyle}>
            By default, new users do not have access to a recruitment ad. To enable this
            functionality, select the account from the drop-down below and then present the
            &quot;create entry&quot; button to create a blank ad for them.
          </MDBCardText>

          <label htmlFor='single-field' style={{ width: '100%', margin: '15px 0' }}>
            Template Creator:
          </label>
          <Select
            name='single-field'
            inputId='single-field'
            options={userAdArray ?? []}
            onChange={option => setSelectedAdUser(option as SingleOptionType)}
            value={selectedAdUser}
          />

          <br />

          <MDBBtn
            noRipple
            tag='a'
            href='#!'
            style={{
              width: '100%',
              margin: '15px 0',
            }}
            className='button-fit-card'
            onClick={() => createBlankAdTemplate(selectedAdUser)}
          >
            Create Template for Editing
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
