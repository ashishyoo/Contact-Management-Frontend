import React from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import Link from "next/link";

interface ProfileCardProps {
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1" gutterBottom>
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/profile/contacts/new"
            >
              Add New Contact
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/profile/contacts"
            >
              View Contacts
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileCard;
