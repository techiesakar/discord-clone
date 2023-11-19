import {
  getAudioChannels,
  getMembers,
  getRole,
  getServer,
  getTextChannels,
  getVideoChannels,
} from "@/app/api/actions";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

export const ServerSideBar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await getServer(serverId);

  if (!server) {
    return redirect("/");
  }

  const textChannels = await getTextChannels(serverId);

  const audioChannels = await getAudioChannels(serverId);

  const videoChannels = await getVideoChannels(serverId);

  const members = await getMembers(serverId, profile.id);

  const role = await getRole(serverId, profile.id);
  console.log(role);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
