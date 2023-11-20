import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
  name?: string;
}
export const UserAvatar = ({ src, className, name }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage
        src={src}
        alt={name && name.length > 0 ? name : "User Avatar"}
        className={cn("h-7 w-7 md:h-10 md:w-10", className)}
      />
    </Avatar>
  );
};
