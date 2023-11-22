import * as z from "zod";
import { ChannelType } from "@prisma/client";

export const serverFormSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
  fileUrl: z.string().min(1, {
    message: "File url is required",
  }),
});

export const channelFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .refine((name) => name.toLocaleLowerCase() !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});
