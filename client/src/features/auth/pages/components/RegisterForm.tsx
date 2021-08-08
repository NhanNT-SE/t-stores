import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, InputAdornment, makeStyles } from "@material-ui/core";
import { AccountBox, Email, Lock, LockOpen } from "@material-ui/icons";
import { InputField } from "components/form-fields";
import { RegisterInput } from "models/input-model";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));
export interface RegisterFormProps {
  initialValue: RegisterInput;
  onSubmit: (formValue: RegisterInput) => void;
}
const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(6),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password not match"),
});

export default function RegisterForm({
  initialValue,
  onSubmit,
}: RegisterFormProps) {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<RegisterInput>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const handleFormSubmit = (formValue: RegisterInput) => {
    onSubmit(formValue);
  };
  return (
    <Box mt={3} className={classes.root}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <InputField
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          optional={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <InputField
          name="username"
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
          control={control}
          label="Password"
          type="password"
          placeholder="Enter your password"
          optional={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <InputField
          name="passwordConfirm"
          control={control}
          label="Password confirm"
          type="password"
          placeholder="Verify your password"
          optional={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOpen />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ width: "fit-content" }}
          disabled={isSubmitting || !isValid}
        >
          {/* {isSubmitting && <CircularProgress size={16} color="primary" />} */}
          &nbsp; Register
        </Button>
      </form>
    </Box>
  );
}
