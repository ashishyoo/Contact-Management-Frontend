"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth";
import { UserLoginDto } from "@/types/user";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Link as MuiLink,
  Alert,
  Fade,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginDto>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState(false);

  const onSubmit = async (data: UserLoginDto) => {
    try {
      await login(data);
      router.push("/profile?login=success");
    } catch (error) {
      console.log(error, "Login failed");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  return (
    <Container maxWidth="sm">
      <Fade in={!!error} timeout={600}>
        <Alert
          severity="error"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          Invalid email or password
        </Alert>
      </Fade>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...formRegister("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <MuiLink
          component={Link}
          href="/register"
          sx={{ mt: 2, display: "block" }}
        >
          Don&apos;t have an account? Register
        </MuiLink>
      </Box>
    </Container>
  );
};

export default Login;
