"use client";

import { useRouter, usePathname } from "next/navigation";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { logout } from "@/utils/auth";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar className="flex gap-2">
          <Box sx={{ flexGrow: 1 }} />
          {pathname !== "/profile" && (
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href="/profile"
              className="flex gap-1 items-center justify-center"
            >
              <AccountCircleOutlinedIcon />
              Profile
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            className="flex gap-1 items-center justify-center"
          >
            <LogoutOutlinedIcon />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{children}</Container>
    </>
  );
}
