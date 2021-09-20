import { InputBaseProps, TextField } from "@mui/material";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label: string;
  variant?: "filled" | "outlined" | "standard";
  sizeInput?: "small" | "medium";
  optional?: InputBaseProps;
}

export function InputField({
  name,
  control,
  label,
  variant,
  sizeInput,
  optional,
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
      size={sizeInput ? sizeInput : "small"}
      margin="normal"
      variant={variant ? variant : "outlined"}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
      InputProps={optional}
    />
    
  );
}
