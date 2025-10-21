"use client"

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from 'next/link';
import login from "./login";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, { error: ""})

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <h1>Login</h1>
        <TextField error={!!state.error} helperText={state.error} name="email" label="Email" variant="outlined" type="email" fullWidth />
        <TextField error={!!state.error} helperText={state.error} name="password" label="Password" type="password" variant="outlined" fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center" passHref>
          Sign up
        </Link>
      </Stack>
    </form>
  );
}
