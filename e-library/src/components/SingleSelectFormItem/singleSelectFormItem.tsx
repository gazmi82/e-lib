import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import useFocus from '../../helpers/focusHook';
import FormErrors from '../FormErrors';

interface SingleSelectFormItemProps {
  label?: string;
  name: string;
  options: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: any;
  initialValue?: string;
  style?: any;
  isClearable?: any;
}

export const SingleSelectFormItem: React.FunctionComponent<
  SingleSelectFormItemProps
> = ({
  label,
  name,
  options,
  placeholder,
  required,
  disabled,
  onChange,
  initialValue,
  style,
  isClearable,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState<any>(initialValue);
  const [inputRef, setInputFocus] = useFocus();

  const formContext = useFormContext();

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

  const { register, setValue, watch } = getValuesSelected();

  const {
    formState: { touchedFields, isSubmitted, errors },
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
  );

  const defaultValue = watch(name);

  useEffect(() => {
    register(name);
  }, [register, name]);

  const value = () => {
    if (defaultValue != null) {
      return options.find((option: any) => option.value === defaultValue);
    }

    return null;
  };

  const controlStyles = {
    control: (provided: any) => ({
      ...provided,
      height: '44px',
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

  return (
    <div className="select-box">
      <Select
        value={value()}
        defaultValue={initialValue && { label: name, value: initialValue }}
        onChange={e => {
          onChange && onChange(e);
          setValue(name, e?.value ?? null, { shouldValidate: true });
          setIsSelected(e);
        }}
        id={name}
        name={name}
        ref={inputRef}
        openMenuOnFocus={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        options={options}
        isDisabled={disabled}
        styles={controlStyles}
        classNamePrefix={`${errorMessage ? 'invalid-input' : 'select'}`}
        isClearable={isClearable}
      />
      <span
        style={{ backgroundColor: disabled ? 'hsl(0, 0%, 95%)' : 'white' }}
        onClick={() => setInputFocus()}
        className={`custom-placeholder ${
          isFocused || isSelected
            ? 'is-focused'
            : errorMessage
            ? 'placeholder-error'
            : ''
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
