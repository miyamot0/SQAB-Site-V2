/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import Footer from '../Footer';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockCallback = jest.fn();

describe('Footer', () => {
  it('Check render', async () => {
    await act(async () => {
      const wrapper = mount(
        <AuthorizationContext.Provider
          value={{
            user: { uid: '1234', email: 'asdf@asdf.com' } as firebase.User,
            authIsReady: false,
            studentRecruitFlag: false,
            diversityReviewFlag: false,
            systemAdministratorFlag: false,
            submissionReviewFlag: false,
            dispatch: undefined,
          }}
        >
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        </AuthorizationContext.Provider>,
      );

      await waitFor(() => {
        expect(wrapper.find(Footer).length).toBe(1);
      });
    });
  });

  it('Check render and open modal button', async () => {
    await act(async () => {
      const wrapper = mount(
        <AuthorizationContext.Provider
          value={{
            user: { uid: '1234', email: 'asdf@asdf.com' } as firebase.User,
            authIsReady: false,
            studentRecruitFlag: false,
            diversityReviewFlag: false,
            systemAdministratorFlag: false,
            submissionReviewFlag: false,
            dispatch: undefined,
          }}
        >
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        </AuthorizationContext.Provider>,
      );
    });
  });
});
