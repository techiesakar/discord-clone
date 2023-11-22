"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";
import { serverFormSchema } from "@/lib/schema-zod";

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "messageFile";

  const messageFormSchema = serverFormSchema.pick({ fileUrl: true });

  const form = useForm({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof messageFormSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });

      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading} type="submit">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
