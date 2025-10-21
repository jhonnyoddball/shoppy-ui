import Box from "@mui/material/Box";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="h-screen flex items-center justify-center">
      {children}
    </Box>
  );
}
