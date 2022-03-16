import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from '../FormErrors';
import useFocus from '../../helpers/focusHook';

interface CheckBoxItemProps {
  label?: string;
  name: string;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: any;
  style?: any;
}

export const CheckBoxItem: React.FunctionComponent<CheckBoxItemProps> = ({
  label,
  name,
  required,
  checked,
  disabled,
  className,
  onChange,
  style,
}) => {
  const [inputRef, setInputFocus] = useFocus();
  const {
    register,
    formState: { touchedFields, isSubmitted, errors },
    setValue,
  } = useFormContext();
  const [inputValue, setInputValue] = useState(false);

  useEffect(() => {
    if (checked) {
      setInputValue(checked);
    }
  }, []);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
  );

  return (
    <div className="checkbox">
      <label className="checkbox-label">{label}</label>
      <input
        id={name}
        {...register(name)}
        type="checkbox"
        disabled={disabled}
        className={`${errorMessage ? 'invalid-input' : ''} + ${className}`}
        style={style}
        ref={inputRef}
        onChange={e => {
          onChange && onChange(e);
          setValue(name, e.target.checked);
          setInputValue(e.target.checked as boolean);
        }}
        defaultChecked={checked}
        required={required}
      />
      {errorMessage && (
        <div className="error-message">{name && errorMessage}</div>
      )}
    </div>
  );
};

CheckBoxItem.defaultProps = {
  required: false,
};
