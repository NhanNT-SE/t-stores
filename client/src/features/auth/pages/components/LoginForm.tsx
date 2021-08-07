import { Box, InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { InputField } from "components/form-fields";
import React from "react";
import { useForm } from "react-hook-form";

export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    // defaultValues: initialValue,
    // resolver: yupResolver(schema),
  });
  return (
    <Box>
      <form>
        <InputField
          name="username"
          control={control}
          label="Username"
          variant="standard"
          advanced={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
}
