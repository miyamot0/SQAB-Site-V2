/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import selectEvent from 'react-select-event';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import StandardEntryFieldSelectMultiple from '../StandardEntryFieldSelectMultiple';

Enzyme.configure({ adapter: new Adapter() });

describe('StandardEntryFieldSelectMultiple', () => {
  it('Should fire dispatch', async () => {
    await act(async () => {
      const label = 'multi-field';
      const dispatch = jest.fn();

      const options = [
        { value: 'K', label: 'Kindergarten' },
        { value: '1st', label: 'First Grade' },
        { value: '2nd', label: 'Second Grade' },
        { value: '3rd', label: 'Third Grade' },
        { value: '4th', label: 'Fourth Grade' },
        { value: '5th', label: 'Fifth Grade' },
        { value: '6th', label: 'Sixth Grade' },
      ];

      const result = render(
        <StandardEntryFieldSelectMultiple
          label={label}
          options={options}
          currentValue={[options[0]]}
          type={0}
          dispatch={dispatch}
        />,
      );

      const input = result.getByLabelText(`${label}:`);

      await selectEvent.select(input, 'Second Grade');

      await selectEvent.select(input, 'Third Grade');

      expect(dispatch).toBeCalled();
    });
  });
});
