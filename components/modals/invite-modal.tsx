"use client";
import axios from "axios";

import { Check, Copy, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const InviteModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const generateNewLink = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join the server.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input disabled={isLoading} id="link" value={inviteUrl} readOnly />
          </div>
          <Button
            disabled={isLoading}
            size="sm"
            className="px-3"
            onClick={onCopy}
          >
            <span className="sr-only">Copy</span>

            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            disabled={isLoading}
            variant="secondary"
            onClick={generateNewLink}
          >
            Generate New Link
            <RefreshCw
              className={cn("w-4 h-4 ml-2", isLoading && "animate-spin")}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
