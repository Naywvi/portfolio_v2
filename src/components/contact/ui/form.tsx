"use client";

import useContactForm from "../hooks/useContactForm";
import { Label, LabelInputContainer } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Mail, User, MessageSquare, Send, Sparkles } from "lucide-react";

export function Form(): JSX.Element {
  const { register, handleSubmit, formState, onSubmit } = useContactForm();

  return (
    <div className="relative">
      {/* Background effects */}
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Form card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/80 to-neutral-800/80 p-8 backdrop-blur-xl lg:p-12">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
          {/* Grid layout pour les champs */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Nom */}
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="name" className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-purple-400" />
                  <span>Nom complet</span>
                </Label>
                {formState.errors.name?.message && (
                  <span className="text-xs text-red-400">
                    {formState.errors.name.message}
                  </span>
                )}
              </div>
              <Input
                id="name"
                placeholder="Jean Dupont"
                type="text"
                {...register("name")}
                className="h-12 border-white/10 bg-white/5 pl-4 text-white placeholder:text-neutral-500 focus:border-purple-500/50 focus:bg-white/10"
              />
            </LabelInputContainer>

            {/* Email */}
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="email" className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>Adresse e-mail</span>
                </Label>
                {formState.errors.email?.message && (
                  <span className="text-xs text-red-400">
                    {formState.errors.email.message}
                  </span>
                )}
              </div>
              <Input
                id="email"
                placeholder="jean.dupont@exemple.fr"
                type="email"
                {...register("email")}
                className="h-12 border-white/10 bg-white/5 pl-4 text-white placeholder:text-neutral-500 focus:border-blue-500/50 focus:bg-white/10"
              />
            </LabelInputContainer>
          </div>

          {/* Message */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="message" className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                <span>Votre message</span>
              </Label>
              {formState.errors.message?.message && (
                <span className="text-xs text-red-400">
                  {formState.errors.message.message}
                </span>
              )}
            </div>
            <Textarea
              id="message"
              placeholder="Bonjour, j'aimerais discuter d'un projet..."
              rows={8}
              {...register("message")}
              className="resize-none border-white/10 bg-white/5 p-4 text-white placeholder:text-neutral-500 focus:border-cyan-500/50 focus:bg-white/10"
            />
          </LabelInputContainer>

          {/* Submit button */}
          <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Sparkles className="h-4 w-4" />
              <span>Réponse sous 24h</span>
            </div>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100"
            >
              {formState.isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Envoi en cours...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Envoyer le message</span>
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              )}
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}