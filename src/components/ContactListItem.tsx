"use client";

import { ContactResponseDto } from "@/types/contact";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface ContactListItemProps {
  contact: ContactResponseDto;
  onDelete: (id: number) => void;
}

const ContactListItem = ({ contact, onDelete }: ContactListItemProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between border border-zinc-600 rounded-md px-4 py-2 gap-2">
      <div>
        <Typography variant="h6">{contact.name}</Typography>
        <Typography variant="body2" className="text-zinc-200">
          {contact.email}
        </Typography>
        <Typography variant="body2" className="text-zinc-200">
          {contact.phone}
        </Typography>
      </div>
      <div className="flex gap-2 ">
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href={`/profile/contacts/${contact.id}/edit`}
        >
          <ModeEditOutlineOutlinedIcon />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(contact.id)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </div>
    </div>
  );
};

export default ContactListItem;
