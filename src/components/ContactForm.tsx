"use client";

import { useForm } from "react-hook-form";
import { ContactCreateDto } from "@/types/contact";
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

interface ContactFormProps {
  title: string;
  submitButtonText: string;
  onSubmit: (data: ContactCreateDto) => Promise<void>;
  onCancel?: () => void;
  defaultValues?: ContactCreateDto;
}

const ContactForm = ({
  title,
  submitButtonText,
  onSubmit,
  onCancel,
  defaultValues = { name: "", email: "", phone: "" },
}: ContactFormProps) => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactCreateDto>({
    defaultValues,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...formRegister("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
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
            label="Phone"
            type="tel"
            margin="normal"
            {...formRegister("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: "Invalid phone number",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Processing..." : submitButtonText}
            </Button>
            {onCancel && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </Box>
        </form>
        <MuiLink
          component={Link}
          href="/profile/contacts"
          sx={{ mt: 2, display: "block" }}
        >
          View all contacts
        </MuiLink>
      </Box>
    </Container>
  );
};

export default ContactForm;
