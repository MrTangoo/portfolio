"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AtSign, LoaderCircle, MessageSquare, Send, Tag, User } from "lucide-react";
import toast from "react-hot-toast";
import { useDictionary, useLocale } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-none border-b border-line-inverse bg-transparent py-3 text-base text-paper placeholder:text-paper/35 transition-colors duration-300 ease-out-expo focus:border-vermilion focus:outline-none";

const labelClasses = "label flex items-center gap-2 text-paper/65";

type ApiError = keyof ReturnType<typeof useDictionary>["contact"]["apiErrors"];

export function ContactForm() {
  const dict = useDictionary();
  const locale = useLocale();
  const { form, toasts, apiErrors } = dict.contact;
  const [pending, setPending] = useState(false);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    const send = async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          hp: data.get("_hp"),
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const result = (await response.json()) as { ok: boolean; error?: ApiError };
      if (!response.ok || !result.ok) {
        throw new Error((result.error && apiErrors[result.error]) || toasts.error);
      }
    };

    setPending(true);
    toast
      .promise(send(), {
        loading: toasts.loading,
        success: toasts.success,
        error: (err) => (err instanceof Error && err.message ? err.message : toasts.error),
      })
      .then(() => formElement.reset())
      .catch(() => {})
      .finally(() => setPending(false));
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Honeypot — invisible pour les humains, rempli par les bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-hp">{form.honeypotLabel}</label>
        <input id="contact-hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClasses}>
            <User aria-hidden="true" className="size-3.5 text-vermilion" />
            {form.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClasses}>
            <AtSign aria-hidden="true" className="size-3.5 text-vermilion" />
            {form.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={100}
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className={labelClasses}>
          <Tag aria-hidden="true" className="size-3.5 text-vermilion" />
          {form.subjectLabel}{" "}
          <span className="text-paper/40 normal-case">{form.subjectOptional}</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={150}
          placeholder={form.subjectPlaceholder}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClasses}>
          <MessageSquare aria-hidden="true" className="size-3.5 text-vermilion" />
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder={form.messagePlaceholder}
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group/btn inline-flex min-h-12 w-fit items-center justify-center gap-3 border border-paper bg-paper px-6 py-3 text-sm font-medium tracking-[-0.005em] text-ink transition-[background-color,color,border-color] duration-300 ease-out-expo hover:border-vermilion hover:bg-vermilion hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{pending ? form.sending : form.submit}</span>
        {pending ? (
          <LoaderCircle aria-hidden="true" className="size-4 shrink-0 animate-spin" />
        ) : (
          <Send
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        )}
      </button>

      <p className="max-w-[52ch] text-sm text-paper/50">
        {form.privacyNotice}{" "}
        <Link
          href={`/${locale}/legal`}
          className="underline underline-offset-4 transition-colors duration-150 hover:text-paper"
        >
          {form.privacyLinkLabel}
        </Link>
      </p>
    </form>
  );
}
