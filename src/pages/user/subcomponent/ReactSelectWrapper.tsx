import React from 'react';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { SingleOptionType } from '../../tools/types/GeneralTypes';

import './styles/wrapper.css';

type ReactSelectWrapperProps = {
  isRequired: boolean;
  value: SingleOptionType | undefined;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
};

export const ReactSelectWrapper = (props: ReactSelectWrapperProps) => {
  const { isRequired } = props;
  const [state, setState] = useState({
    value: props.value,
  });
  const selectRef: any = useRef(null);

  const onFocus = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  const onChange = (value: any) => {
    props.onChange(value);
    setState({ value });
  };

  const getValue = () => {
    if (props.value !== undefined && props.value !== null) {
      return props.value.label;
    }
    return state.value ? state.value.label : undefined;
  };

  return (
    <div className={'react-select-wrapper'}>
      <Select {...props} onChange={onChange} ref={selectRef} />
      {isRequired && (
        <input
          tabIndex={-1}
          autoComplete="off"
          className={'hidden-input'}
          //value={getValue()}
          //onFocus={onFocus}
          required
        />
      )}
    </div>
  );
};
