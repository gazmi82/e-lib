import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from '../FormErrors';
import useFocus from '../../helpers/focusHook';

interface TextAreaFormItemProps {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  className?: string;
  onChange?: any;
  style?: any;
  rows?: number;
  columns?: number;
}

export const TextAreaFormItem: React.FunctionComponent<
  TextAreaFormItemProps
> = ({
  label,
  name,
  placeholder,
  required,
  value,
  disabled,
  className,
  onChange,
  style,
  rows,
  columns,
}) => {
  const {
    register,
    formState: { touchedFields, isSubmitted, errors },
    setValue,
  } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState<string>();
  const [inputRef, setInputFocus] = useFocus();
  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
  );

  return (
    <div className="text-area-input-box">
      <textarea
        id={name}
        defaultValue={value}
        {...register(name)}
        placeholder={''}
        disabled={disabled}
        className={`${errorMessage ? 'invalid-input' : ''} + ${className}`}
        style={style}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={e => {
          onChange && onChange(e.target.value);
          setValue(name, e.target.value);
          setIsSelected(e.target.value);
        }}
        required={required}
        rows={rows}
        cols={columns}
        maxLength={250}
      />
      <span
        onClick={() => setInputFocus()}
        className={`custom-placeholder ${
          isFocused || value || isSelected
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

TextAreaFormItem.defaultProps = {
  rows: 5,
  columns: 60,
  required: false,
};
