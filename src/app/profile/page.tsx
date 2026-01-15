"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { UserResponseDto } from "@/types/user";
import { Container, Box, CircularProgress, Fade, Alert } from "@mui/material";
import ProfileCard from "@/components/ProfileCard";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.log(error, "Failed to fetch user");
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) return null;

  return (
    <>
      <Fade in={!!success} timeout={600}>
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          Login Successfully
        </Alert>
      </Fade>
      <ProfileCard user={user} />
    </>
  );
}
