/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import Router from 'react-router-dom';
import Tutorials from '../Tutorials';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Tutorials', () => {
  it('Should render starting directory', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '-1' });

    await act(async () => {
      const wrapper = mount(<Tutorials />);

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Pre-eminent Tutorials'));
      });
    });
  });

  it('Should render with video id', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });

    await act(async () => {
      const wrapper = mount(<Tutorials />);

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Pre-eminent Tutorials'));
      });
    });
  });
});
