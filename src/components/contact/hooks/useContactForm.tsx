import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "~/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type FormData = z.infer<typeof formSchema>;

interface UseContactFormReturn {
  register: UseFormReturn<FormData>["register"];
  handleSubmit: UseFormReturn<FormData>["handleSubmit"];
  formState: UseFormReturn<FormData>["formState"];
  onSubmit: (data: FormData) => Promise<void>;
}

const useContactForm = (): UseContactFormReturn => {
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const sendEmail = async (data: FormData): Promise<void> => {
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
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    await sendEmail(data);
  };

  return {
    register,
    handleSubmit,
    formState,
    onSubmit,
  };
};

export default useContactForm;