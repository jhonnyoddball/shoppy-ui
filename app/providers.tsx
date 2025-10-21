'use client';

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";

export default function Providers({ 
  children, 
  authenticated 
}: {
  children: React.ReactNode;
  authenticated: boolean;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
