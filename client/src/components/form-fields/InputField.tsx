import { InputBaseProps, InputProps, TextField,  } from "@material-ui/core";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label: string;
  variant: "filled" | "outlined" | "standard";
  advanced?:InputBaseProps
}

export function InputField({
  name,
  control,
  label,
  variant,
  advanced,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      variant={variant}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
      InputProps={advanced}
      
    />
  );
}
