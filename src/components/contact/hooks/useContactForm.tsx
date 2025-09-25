import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMessage } from "~/contexts/message-context";
import { useToast } from "~/hooks/use-toast";

const formData = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
});

const emailData = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

type FormData = z.infer<typeof formData>;
type EmailData = z.infer<typeof emailData>;

const useContactForm = () => {
  const [message, setMessage] = useState<string>("");
  const { messageContent, setMessageContent } = useMessage();
  const { toast } = useToast();

  const { register, handleSubmit, watch, reset, formState } = useForm<FormData>(
    {
      defaultValues: {
        name: "",
        email: "",
      },
      resolver: zodResolver(formData),
    },
  );

  const sendEmail = async (data: EmailData) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi de l'e-mail");
      }
      reset();
      toast({
        title: "Message envoyé !",
        description: "Je vous contacterai dès que possible 🥳",
      });
      setMessage("");
      setMessageContent("");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    const sanitizedData = {
      ...data,
      message: messageContent,
    };

    await sendEmail(sanitizedData);
  };

  return {
    register,
    handleSubmit,
    watch,
    formState,
    message,
    setMessage,
    onSubmit,
  };
};

export default useContactForm;
