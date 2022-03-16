import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import FormErrors from '../FormErrors';
import makeAnimated from 'react-select/animated';
import useFocus from '../../helpers/focusHook';
import equal from 'deep-equal';

interface MultiSelectFormItemProps {
  label?: string;
  name: string;
  options: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: any;
  selectValue?: any;
  style?: any;
  isMulti?: any;
}

export const MultiSelectFormItem: React.FunctionComponent<
  MultiSelectFormItemProps
> = ({ name, options, placeholder, disabled, onChange, selectValue }) => {
  const formContext = useFormContext();
  const animatedComponents = makeAnimated();
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [innerValue, setInnerValue] = useState([]);
  const [inputRef, setInputFocus] = useFocus();

  const getValuesSelected = () => {
    return formContext
      ? formContext
      : {
          register: ({ name: any }: any) => null,
          formState: {
            isSubmitted: null,
          },
          setValue: (obj: any) => null,
          watch: (obj: any) => null,
        };
  };

  const { register, setValue } = getValuesSelected();

  const {
    formState: { touchedFields, isSubmitted, errors },
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
  );

  useEffect(() => {
    register(name);
  }, [register, name]);

  const controlStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '44px',
      padding: '5px 0',
      boxShadow: 'none',
      borderColor: '#ccc',
      borderRadius: '0px',
      '&:focus-within': {
        color: '#212529',
        backgroundColor: '#fff',
        border: '1px solid #3f78e0',
        boxShadow: ' 0 0 4px #3f78e0',
      },
    }),
    option: (provided: any) => ({
      ...provided,
      width: '100%',
      marginTop: '5px',
      marginBottom: '5px',
      '&:hover': {
        backgroundColor: '#3f78e0',
        color: '#fff',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      visibility: 'hidden',
      display: 'none',
    }),
  };

  const addClass =
    isFocused || selectValue?.length > 0 || innerValue.length > 0
      ? true
      : false;

  return (
    <div className="select-box">
      <Select
        value={selectValue}
        onChange={e => {
          onChange && onChange(e);
          setValue(name, e, { shouldValidate: true });
          setInnerValue(e);
        }}
        isMulti
        ref={inputRef}
        openMenuOnFocus={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id={name}
        placeholder={''}
        name={name}
        options={options}
        components={animatedComponents}
        closeMenuOnSelect={false}
        isDisabled={disabled}
        styles={controlStyles}
        classNamePrefix={`${errorMessage ? 'invalid-input' : ''}`}
      />
      <span
        style={{ backgroundColor: disabled ? 'hsl(0, 0%, 95%)' : 'white' }}
        onClick={() => setInputFocus()}
        className={`custom-placeholder ${
          addClass ? 'is-focused' : errorMessage ? 'placeholder-error' : ''
        }`}
      >
        {placeholder}
      </span>
      {errorMessage && (
        <div className="error-message">{name && errorMessage}</div>
      )}
    </div>
  );
};
