"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { register } from "@/utils/auth";
import { UserRegisterDto } from "@/types/user";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterDto>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserRegisterDto) => {
    try {
      await register(data);
      router.push("/login");
    } catch (error) {
      console.log(error, "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...formRegister("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
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
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
        <MuiLink
          component={Link}
          href="/login"
          sx={{ mt: 2, display: "block" }}
        >
          Have an account? Login
        </MuiLink>
      </Box>
    </Container>
  );
};

export default Register;
