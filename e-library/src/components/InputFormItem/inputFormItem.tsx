import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from '../FormErrors';
import useFocus from '../../helpers/focusHook';

interface InputFormItemProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: any;
  disabled?: boolean;
  className?: string;
  onChange?: any;
  style?: any;
}

export const InputFormItem: React.FunctionComponent<InputFormItemProps> = ({
  label,
  name,
  type,
  placeholder,
  required,
  value,
  disabled,
  className,
  onChange,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [inputRef, setInputFocus] = useFocus();
  const {
    register,
    formState: { touchedFields, isSubmitted, errors },
    setValue,
  } = useFormContext();
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, []);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
  );

  return (
    <div className="input-box">
      <label className="form-label">{label}</label>
      <input
        id={name}
        defaultValue={value}
        {...register(name)}
        type={type}
        placeholder={''}
        disabled={disabled}
        className={`${errorMessage ? 'invalid-input' : ''} + ${className}`}
        style={style}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={e => {
          onChange && onChange(e);
          setValue(name, e.target.value);
          setInputValue(e.target.value as any);
        }}
        required={required}
      />
      <span
        onClick={() => setInputFocus()}
        className={`custom-placeholder ${
          isFocused || inputValue
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

InputFormItem.defaultProps = {
  type: 'text',
  required: false,
};
