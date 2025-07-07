"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createContact } from "@/utils/contacts";
import { getCurrentUser } from "@/utils/auth";
import { ContactCreateDto } from "@/types/contact";
import ContactForm from "@/components/ContactForm";

const NewContact = () => {
  const router = useRouter();
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
      router.push("/profile/contacts");
    } catch (error) {
      console.log(error, "Failed to create contact");
    }
  };

  const handleCancel = () => {
    router.push("/profile/contacts");
  };

  return (
    <ContactForm
      title="Add New Contact"
      submitButtonText="Create Contact"
      onSubmit={onSubmit}
      onCancel={handleCancel}
    />
  );
};

export default NewContact;
