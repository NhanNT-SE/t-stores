import {
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
export interface CheckBoxFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label: string;
  sizeInput?: "small" | "medium";
  color?: "default" | "primary" | "secondary";
}

export function CheckBoxField({
  name,
  control,
  label,
  sizeInput,
  color,
  ...inputProps
}: CheckBoxFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
  });
  return (
    <FormControlLabel
      control={
        <Checkbox
          size={sizeInput ? sizeInput : "medium"}
          name={name}
          value={value}
          color={color ? color : "primary"}
          onChange={onChange}
          onBlur={onBlur}
          inputProps={inputProps}
          inputRef={ref}
        />
      }
      label={label}
    />
  );
}
