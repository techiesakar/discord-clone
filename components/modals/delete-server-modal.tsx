"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [isLoading, setIsLoading] = useState(false);

  const onLeave = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/servers/${server?.id}`);
      if (res.status == 200) {
        console.log("deleted", res);
        router.refresh();
        onClose();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete
            <span className="font-semibold text-indigo-500 ml-1">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="items-center flex justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onLeave}
              type="submit"
              variant="primary"
            >
              Delete Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
