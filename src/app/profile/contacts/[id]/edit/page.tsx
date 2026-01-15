"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getContact, updateContact } from "@/utils/contacts";
import { getCurrentUser } from "@/utils/auth";
import { ContactCreateDto } from "@/types/contact";
import { Container, Box, CircularProgress, Fade, Alert } from "@mui/material";
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
  const [isUpdate, setIsUpdate] = useState(false);

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
      setIsUpdate(true);
      setTimeout(() => setIsUpdate(false), 4000);
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
    <>
      <Fade in={!!isUpdate} timeout={600}>
        <Alert
          severity="info"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          Contact Updated Successfully
        </Alert>
      </Fade>
      <ContactForm
        title="Edit Contact"
        submitButtonText="Update Contact"
        onSubmit={onSubmit}
        onCancel={handleCancel}
        defaultValues={defaultValues}
      />
    </>
  );
}
