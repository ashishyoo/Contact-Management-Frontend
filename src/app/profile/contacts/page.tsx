"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getContacts, deleteContact } from "@/utils/contacts";
import { getCurrentUser } from "@/utils/auth";
import { ContactResponseDto } from "@/types/contact";
import {
  Container,
  Box,
  Typography,
  List,
  CircularProgress,
  Link as MuiLink,
  Fade,
  Alert,
} from "@mui/material";
import Link from "next/link";
import ContactListItem from "@/components/ContactListItem";

export default function Contacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("create") === "success") {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCurrentUser();
        const data = await getContacts();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.log(
          error,
          "Failed to fetch contacts or user not authenticated"
        );
        router.push("/login");
      }
    };
    fetchData();
  }, [router]);

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      setIsDelete(true);
      setTimeout(() => {
        setIsDelete(false);
      }, 4000);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.log(error, "Failed to delete contact");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

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
          Contact Created Successfully
        </Alert>
      </Fade>
      <Fade in={!!isDelete} timeout={600}>
        <Alert
          severity="info"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          Contact Deleted Successfully
        </Alert>
      </Fade>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contacts
          </Typography>
          <MuiLink
            component={Link}
            href="/profile/contacts/new"
            sx={{ mb: 2, display: "block" }}
          >
            Add New Contact
          </MuiLink>
          {contacts.length === 0 ? (
            <Typography variant="body1">No contacts found.</Typography>
          ) : (
            <List className="max-w-full flex flex-col gap-2">
              {contacts.map((contact) => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  onDelete={handleDelete}
                />
              ))}
            </List>
          )}
        </Box>
      </Container>
    </>
  );
}
