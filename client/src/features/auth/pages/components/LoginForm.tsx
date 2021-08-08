import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { AccountBox, Lock } from "@material-ui/icons";
import { InputField } from "components/form-fields";
import { CheckBoxField } from "components/form-fields/CheckBoxField";
import { LoginInput } from "models/input-model";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface LoginFormProps {
  initialValue: LoginInput;
  onSubmit: (formValue: LoginInput) => void;
}
const schema = yup.object().shape({
  username: yup.string().required().min(6),
  password: yup.string().required().min(8),
});

export default function LoginForm({ initialValue, onSubmit }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<LoginInput>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const handleFormSubmit = (formValue: LoginInput) => {
    onSubmit(formValue);
  };
  return (
    <Box mt={3}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          name="username"
          sizeInput="medium"
          control={control}
          label="Username"
          placeholder="Enter your username"
          optional={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBox />
              </InputAdornment>
            ),
          }}
        />
        <InputField
          name="password"
          sizeInput="medium"
          control={control}
          label="Password"
          type="password"
          placeholder="Enter your Password"
          optional={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Box mt={3}>
          <CheckBoxField
            control={control}
            name="isRemember"
            label="Remember me?"
          />
        </Box>
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp; Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
