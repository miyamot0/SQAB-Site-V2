/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import Select, { GroupBase, MultiValue } from 'react-select';
import { SingleOptionType } from '../pages/tools/types/GeneralTypes';
import { UserEditAction } from '../pages/user/functionality/UserProfileFunctionality';
import { ReactSelectWrapper } from '../pages/user/subcomponent/ReactSelectWrapper';

/** remapStringArray
 *
 * @param array
 * @returns
 */
export function remapStringArray(array: string[]): SingleOptionType[] {
  return array.map((str) => {
    return {
      label: str,
      value: str,
    };
  });
}

/** StandardEntryFieldText
 *
 * @param param0
 * @returns
 */
export function StandardEntryFieldText({
  label,
  currentValue,
  type,
  dispatch,
}: {
  label: string;
  currentValue: string;
  type: UserEditAction;
  dispatch: any;
}) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: type,
            payload: e.target.value,
          });
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

/** StandardEmailFieldText
 *
 * @param param0
 * @returns
 */
export function StandardEmailFieldText({
  label,
  currentValue,
  type,
  dispatch,
}: {
  label: string;
  currentValue: string;
  type: UserEditAction;
  dispatch: any;
}) {
  return (
    <label>
      <span>{label}:</span>
      <input
        required
        type="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: type,
            payload: e.target.value,
          });
        }}
        value={currentValue}
      ></input>
    </label>
  );
}

/** StandardSelectField
 *
 * @param param0
 * @returns
 */
export function StandardSelectField({
  label,
  options,
  currentValue,
  type,
  dispatch,
}: {
  label: string;
  options: any;
  currentValue: SingleOptionType | undefined;
  type: UserEditAction;
  dispatch: any;
}) {
  return (
    <>
      <label htmlFor="single-field" className="select-label">
        {label}:
      </label>
      <ReactSelectWrapper
        isRequired={true}
        options={options}
        onChange={(option) => {
          if (option) {
            dispatch({
              type: type,
              payload: option,
            });
          } else {
            return;
          }
        }}
        value={currentValue}
      />
    </>
  );
}

/** StandardSelectFieldMulti
 *
 * @param param0
 * @returns
 */
export function StandardSelectFieldMulti({
  label,
  options,
  currentValue,
  type,
  dispatch,
}: {
  label: string;
  options: any;
  currentValue: MultiValue<SingleOptionType> | undefined;
  type: UserEditAction;
  dispatch: any;
}) {
  return (
    <>
      <label htmlFor="multi-field" className="select-label">
        {label}:
      </label>
      <Select
        name={'multi-field'}
        inputId={'multi-field'}
        options={options}
        onChange={(option: MultiValue<SingleOptionType>) => {
          if (option) {
            dispatch({
              type: type,
              payload: option,
            });
          } else {
            return;
          }
        }}
        value={currentValue}
        isMulti={true}
      />
    </>
  );
}
