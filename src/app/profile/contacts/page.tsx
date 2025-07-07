"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";
import Link from "next/link";
import ContactListItem from "@/components/ContactListItem";

export default function Contacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

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
  );
}
