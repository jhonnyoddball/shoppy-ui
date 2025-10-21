"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from 'next/link';
import createUser from "./create-user";
import { useActionState } from "react";

export default function SignupPage() {
  const [state, formAction] = useActionState(createUser, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <h1>Sign up</h1>
        <TextField name="email" label="Email" variant="outlined" type="email" helperText={state.error} error={!!state.error} fullWidth />
        <TextField name="password" label="Password" type="password" variant="outlined" helperText={state.error} error={!!state.error} fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign up
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center" passHref>
          Already have an account? Login
        </Link>
      </Stack>
    </form>
  );
}
