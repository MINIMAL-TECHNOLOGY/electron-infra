import React from 'react';
import NumberFormat, { InputAttributes } from 'react-number-format';

const _Formmat = (props: any, ref: any) => {
  const { onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({ target: { name, value: values.value } });
      }}
      thousandSeparator
    />
  );
};

export const LocaleStringFormat = React.forwardRef<
  NumberFormat<InputAttributes>,
  {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
>(_Formmat);
