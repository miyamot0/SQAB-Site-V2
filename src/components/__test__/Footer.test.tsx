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
import Footer from '../Footer';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('Footer', () => {
  it('Check render', async () => {
    await act(async () => {
      const wrapper = mount(<Footer />);

      await waitFor(() => {
        expect(wrapper.find(Footer).length).toBe(1);
      });
    });
  });
});
