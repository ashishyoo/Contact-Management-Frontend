import api from "./api";
import { ContactCreateDto, ContactResponseDto } from "@/types/contact";

export const getContacts = async (): Promise<ContactResponseDto[]> => {
  const response = await api.get<ContactResponseDto[]>("/contacts");
  return response.data;
};

export const getContact = async (id: number): Promise<ContactResponseDto> => {
  const response = await api.get<ContactResponseDto>(`/contacts/${id}`);
  return response.data;
};

export const createContact = async (
  contactData: ContactCreateDto
): Promise<ContactResponseDto> => {
  const response = await api.post<ContactResponseDto>("/contacts", contactData);
  return response.data;
};

export const updateContact = async (
  id: number,
  contactData: ContactCreateDto
): Promise<ContactResponseDto> => {
  const response = await api.put<ContactResponseDto>(
    `/contacts/${id}`,
    contactData
  );
  return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};
