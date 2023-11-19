"use server";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

export const getServer = async (serverId: string) => {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (server) {
    return server;
  }
};

export const getTextChannels = async (serverId: string) => {
  const server = await getServer(serverId);
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  return textChannels;
};

export const getAudioChannels = async (serverId: string) => {
  const server = await getServer(serverId);
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  return audioChannels;
};

export const getVideoChannels = async (serverId: string) => {
  const server = await getServer(serverId);
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  return videoChannels;
};

export const getMembers = async (serverId: string, profileId: string) => {
  const server = await getServer(serverId);
  const members = server?.members.filter(
    (member) => member.profileId !== profileId
  );
  return members;
};

export const getRole = async (serverId: string, profileId: string) => {
  const server = await getServer(serverId);
  const role = server?.members.find(
    (member) => member.profileId === profileId
  )?.role;
  return role;
};
