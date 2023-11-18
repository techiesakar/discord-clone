"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const serverSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const addServer = async (values: z.infer<typeof serverSchema>) => {
  const profile = await currentProfile();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const validateFields = serverSchema.safeParse({
    name: values.name,
    imageUrl: values.imageUrl,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const { name, imageUrl } = validateFields.data;

  const server = await db.server.create({
    data: {
      profileId: profile.id,
      name,
      imageUrl,
      inviteCode: uuidv4(),
      channels: {
        create: [{ name: "general", profileId: profile.id }],
      },
      members: {
        create: [
          {
            profileId: profile.id,
            role: MemberRole.ADMIN,
          },
        ],
      },
    },
  });

  if (server) {
    console.log("data added", server);
  }
};

export const uploadImage = async (formData: FormData) => {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const path = `./public/%${file.name}`;
  await writeFile(path, buffer);
};
