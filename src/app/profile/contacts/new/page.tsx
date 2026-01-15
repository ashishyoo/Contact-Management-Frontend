"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createContact } from "@/utils/contacts";
import { getCurrentUser } from "@/utils/auth";
import { ContactCreateDto } from "@/types/contact";
import ContactForm from "@/components/ContactForm";
import { Fade, Alert } from "@mui/material";

const NewContact = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        console.log(error, "User not authenticated");
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const onSubmit = async (data: ContactCreateDto) => {
    try {
      await createContact(data);
      router.push("/profile/contacts?create=success");
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      console.log(error, "Failed to create contact");
    }
  };

  const handleCancel = () => {
    router.push("/profile/contacts");
  };

  return (
    <>
      <Fade in={!!error} timeout={600}>
        <Alert
          severity="error"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          A contact with this email or phone already exists
        </Alert>
      </Fade>
      <ContactForm
        title="Add New Contact"
        submitButtonText="Create Contact"
        onSubmit={onSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};

export default NewContact;
