"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getContact, updateContact } from "@/utils/contacts";
import { getCurrentUser } from "@/utils/auth";
import { ContactCreateDto } from "@/types/contact";
import { Container, Box, CircularProgress } from "@mui/material";
import ContactForm from "@/components/ContactForm";

export default function EditContact() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<ContactCreateDto>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCurrentUser();
        const contact = await getContact(id);
        setDefaultValues({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        });
        setLoading(false);
      } catch (error) {
        console.log(error, "Failed to fetch contact or user not authenticated");
        router.push("/login");
      }
    };
    fetchData();
  }, [id, router]);

  const onSubmit = async (data: ContactCreateDto) => {
    try {
      await updateContact(id, data);
      router.push("/profile/contacts");
    } catch (error) {
      console.log(error, "Failed to update contact");
    }
  };

  const handleCancel = () => {
    router.push("/profile/contacts");
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
    <ContactForm
      title="Edit Contact"
      submitButtonText="Update Contact"
      onSubmit={onSubmit}
      onCancel={handleCancel}
      defaultValues={defaultValues}
    />
  );
}
