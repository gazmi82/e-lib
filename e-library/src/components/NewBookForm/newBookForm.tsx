import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

interface NewBookFormProps {
  schema: any;
  initialValues: any;
  onHandleSuccess: any;
  onHandleError: any;
  children: any;
  style?: any;
}

export const NewBookForm: React.FunctionComponent<NewBookFormProps> = ({
  schema,
  initialValues,
  onHandleSuccess,
  onHandleError,
  children,
  style,
}) => {
  const formConfig = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialValues,
  });
  return (
    <div style={style}>
      <FormProvider {...formConfig}>
        <form
          onSubmit={formConfig.handleSubmit(onHandleSuccess, onHandleError)}
        >
          {children}
        </form>
      </FormProvider>
    </div>
  );
};
